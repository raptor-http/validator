import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is a number.
 */
export default class NumberRule implements Rule {
  public name(): string {
    return "number";
  }

  public validate(
    value: unknown,
    _field: string,
    _data: Record<string, unknown>,
  ): boolean | string {
    if (value === undefined || value === null) {
      return true;
    }

    return typeof value === "number" && !isNaN(value);
  }

  public message(field: string): string {
    return `The ${field} field must be a number`;
  }
}
