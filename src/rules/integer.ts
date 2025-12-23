import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is an integer.
 */
export default class IntegerRule implements Rule {
  public name(): string {
    return "integer";
  }

  public validate(
    value: unknown,
    _field: string,
    _data: Record<string, unknown>,
  ): boolean | string {
    if (value === undefined || value === null) {
      return true;
    }

    if (typeof value !== "number" || isNaN(value)) {
      return false;
    }

    return Number.isInteger(value);
  }

  public message(field: string): string {
    return `The ${field} field must be an integer`;
  }
}
