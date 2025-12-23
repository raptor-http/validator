import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is a lowercase string.
 */
export default class LowercaseRule implements Rule {
  public name(): string {
    return "lowercase";
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

    return value === value.toLowerCase();
  }

  public message(field: string): string {
    return `The ${field} field must be lowercase`;
  }
}
