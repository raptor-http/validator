import type { Rule } from "../interfaces/rule.ts";

/**
 * Validates that a field contains only alphanumeric characters, dashes, and underscores.
 */
export default class AlphaDashRule implements Rule {
  public name(): string {
    return "alpha_dash";
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

    const alphaDashRegex = /^[\p{L}\p{M}\p{N}_-]+$/u;

    return alphaDashRegex.test(value);
  }

  public message(field: string): string {
    return `The ${field} field must contain only letters, numbers, dashes, and underscores`;
  }
}
