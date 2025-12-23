import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field contains only alphanumeric characters.
 */
export default class AlphaNumRule implements Rule {
  public name(): string {
    return "alpha_num";
  }

  public validate(
    value: unknown,
    _field: string,
    _data: Record<string, unknown>,
  ): boolean | string {
    if (value === undefined || value === null) {
      return true;
    }

    if (typeof value !== "string") {
      return false;
    }

    if (value.length === 0) {
      return false;
    }

    const alphaNumRegex = /^[\p{L}\p{M}\p{N}]+$/u;

    return alphaNumRegex.test(value);
  }

  public message(field: string): string {
    return `The ${field} field must contain only letters and numbers`;
  }
}
