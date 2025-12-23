import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is a decimal.
 */
export default class DecimalRule implements Rule {
  public name(): string {
    return "decimal";
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

    return !Number.isInteger(value);
  }

  public message(field: string): string {
    return `The ${field} field must be a decimal number`;
  }
}
