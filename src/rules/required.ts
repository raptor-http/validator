import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is present and not null/undefined.
 */
export default class RequiredRule implements Rule {
  public name(): string {
    return "required";
  }

  public validate(
    value: unknown,
    _field: string,
    _data: Record<string, unknown>,
  ): boolean | string {
    if (value === undefined || value === null) {
      return false;
    }

    if (typeof value === "string" && value.trim() === "") {
      return false;
    }

    return true;
  }

  public message(field: string): string {
    return `The ${field} field is required`;
  }
}
