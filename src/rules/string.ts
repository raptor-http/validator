import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is a string.
 */
export default class StringRule implements Rule {
  public name(): string {
    return "string";
  }

  public validate(
    value: unknown,
    _field: string,
    _data: Record<string, unknown>,
  ): boolean | string {
    if (value === undefined || value === null) {
      return true;
    }

    return typeof value === "string";
  }

  public message(field: string): string {
    return `The ${field} field must be a string`;
  }
}
