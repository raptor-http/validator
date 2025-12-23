import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is a valid date.
 * Accepts Date objects or valid date strings.
 */
export default class DateRule implements Rule {
  public name(): string {
    return "date";
  }

  public validate(
    value: unknown,
    _field: string,
    _data: Record<string, unknown>,
  ): boolean | string {
    if (value === undefined || value === null) {
      return true;
    }

    if (value instanceof Date) {
      return !isNaN(value.getTime());
    }

    if (typeof value !== "string") {
      return false;
    }

    if (value.length === 0) {
      return false;
    }

    const date = new Date(value);

    return !isNaN(date.getTime());
  }

  public message(field: string): string {
    return `The ${field} field must be a valid date`;
  }
}
