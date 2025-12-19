import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is a boolean.
 */
export default class BooleanRule implements Rule {
  public name(): string {
    return "boolean";
  }

  public validate(
    value: unknown,
    _field: string,
    _data: Record<string, unknown>,
  ): boolean | string {
    if (value === undefined || value === null) {
      return true;
    }

    return typeof value === "boolean";
  }

  public message(field: string): string {
    return `The ${field} field must be a boolean`;
  }
}
