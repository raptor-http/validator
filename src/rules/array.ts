import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is an array.
 */
export default class ArrayRule implements Rule {
  public name(): string {
    return "array";
  }

  public validate(
    value: unknown,
    _field: string,
    _data: Record<string, unknown>,
  ): boolean | string {
    if (value === undefined || value === null) {
      return true;
    }

    return Array.isArray(value);
  }

  public message(field: string): string {
    return `The ${field} field must be an array`;
  }
}
