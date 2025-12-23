import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field contains only alphabetic characters.
 */
export default class AlphaRule implements Rule {
  public name(): string {
    return "alpha";
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

    const alphaRegex = /^[\p{L}\p{M}]+$/u;
    
    return alphaRegex.test(value);
  }

  public message(field: string): string {
    return `The ${field} field must contain only alphabetic characters`;
  }
}
