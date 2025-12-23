import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is a valid email address.
 */
export default class EmailRule implements Rule {
  public name(): string {
    return "email";
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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(value);
  }

  public message(field: string): string {
    return `The ${field} field must be a valid email address`;
  }
}
