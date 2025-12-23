import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field is a valid URL.
 */
export default class UrlRule implements Rule {
  public name(): string {
    return "url";
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
      const url = new URL(value);

      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  }

  public message(field: string): string {
    return `The ${field} field must be a valid URL`;
  }
}
