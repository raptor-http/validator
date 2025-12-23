import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field contains valid JSON.
 */
export default class JsonRule implements Rule {
  public name(): string {
    return "json";
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

    try {
      JSON.parse(value);
      return true;
    } catch {
      return false;
    }
  }

  public message(field: string): string {
    return `The ${field} field must be valid JSON`;
  }
}
