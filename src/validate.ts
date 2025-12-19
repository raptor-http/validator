import { UnprocessableEntity, type Context } from "../../raptor-framework/mod.ts";

import Validator from "./validator.ts";

const kValidate = Symbol.for("raptor.request.validate");
const bodyCache = new WeakMap<Request, unknown>();

declare global {
  interface Request {
    validate<T extends Record<string, string>>(
      schema: T,
    ): Promise<InferSchema<T>>;
  }
}

type InferRule<R extends string> = R extends `${string}string${string}` ? string
  : R extends `${string}number${string}` ? number
  : R extends `${string}boolean${string}` ? boolean
  : unknown;

export type InferSchema<T extends Record<string, string>> = {
  [K in keyof T]: InferRule<T[K]>;
};

/**
 * Validation middleware for Raptor.
 */
export default class Validate {
  /**
   * The validator instance.
   */
  private validator: Validator;

  /**
   * Initialize the validation middleware.
   *
   * @param validator Optional custom validator instance.
   */
  constructor(validator?: Validator) {
    this.validator = validator ?? new Validator();
  }

  /**
   * Get the validator instance for registering custom rules.
   *
   * @returns The validator instance.
   */
  public getValidator(): Validator {
    return this.validator;
  }

  /**
   * Handle the validation middleware.
   *
   * @param context The current HTTP context.
   * @param next The next middleware function.
   */
  public handle(context: Context, next: CallableFunction) {
    const { request } = context;

    if (!(kValidate in request)) {
      this.attachValidateMethod(request);
    }

    return next();
  }

  /**
   * Attach the validate method to the request object.
   *
   * @param request The HTTP request.
   */
  private attachValidateMethod(request: Request): void {
    const validator = this.validator;

    Object.defineProperty(request, kValidate, {
      value: async function <T extends Record<string, string>>(schema: T) {
        const body = await getRequestBody(this);
        const result = validator.validate(
          body as Record<string, unknown>,
          schema,
        );

        if (!result.valid && result.errors) {
          throw new UnprocessableEntity(result.errors);
        }

        return result.data as InferSchema<T>;
      },
      writable: false,
      configurable: false,
    });

    Object.defineProperty(request, "validate", {
      get() {
        return (this as any)[kValidate];
      },
      configurable: false,
    });
  }
}

/**
 * Get and cache the request body.
 *
 * @param request The HTTP request.
 * @returns The parsed body.
 */
async function getRequestBody(request: Request): Promise<unknown> {
  let body = bodyCache.get(request);

  if (body !== undefined) {
    return body;
  }

  try {
    body = await request.json();
  } catch (e) {
    if (e instanceof SyntaxError) {
      body = {};
    } else {
      throw e;
    }
  }

  bodyCache.set(request, body);

  return body;
}
