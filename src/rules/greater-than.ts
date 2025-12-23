import type { Rule, RuleFactory } from "../interfaces/rule.ts";

/**
 * Validates that a field is greater than a given value.
 */
class GreaterThanRule implements Rule {
  constructor(private threshold: number) {}

  public name(): string {
    return "gt";
  }

  public validate(
    value: unknown,
    _field: string,
    _data: Record<string, unknown>,
  ): boolean | string {
    if (value === undefined || value === null) {
      return true;
    }

    if (typeof value !== "number" || isNaN(value)) {
      return false;
    }

    return value > this.threshold;
  }

  public message(field: string): string {
    return `The ${field} field must be greater than ${this.threshold}`;
  }
}

/**
 * Factory for creating GreaterThan instances with parameters.
 */
export class GreaterThanFactory implements RuleFactory {
  public make(params: string[]): Rule {
    if (params.length === 0) {
      throw new Error("gt rule requires a parameter (e.g., gt:10)");
    }

    const threshold = parseFloat(params[0]);

    if (isNaN(threshold)) {
      throw new Error(
        `gt rule requires a numeric parameter, got: ${params[0]}`,
      );
    }

    return new GreaterThanRule(threshold);
  }
}

export default new GreaterThanFactory() as RuleFactory;
