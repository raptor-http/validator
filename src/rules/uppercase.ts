import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is an uppercase string.
 */
export default class UppercaseRule implements Rule {
  public name(): string {
    return "uppercase";
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

    return value === value.toUpperCase();
  }

  public message(field: string): string {
    return `The ${field} field must be uppercase`;
  }
}
