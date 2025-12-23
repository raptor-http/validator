import type { Rule, RuleFactory } from "../interfaces/rule.ts";

/**
 * Validates that a field is greater than or equal to a given value.
 */
class GreaterThanOrEqualRule implements Rule {
  constructor(private threshold: number) {}

  public name(): string {
    return "gte";
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

    return value >= this.threshold;
  }

  public message(field: string): string {
    return `The ${field} field must be greater than or equal to ${this.threshold}`;
  }
}

/**
 * Factory for creating GteRule instances with parameters.
 */
export class GreaterThanOrEqualRuleFactory implements RuleFactory {
  public make(params: string[]): Rule {
    if (params.length === 0) {
      throw new Error("gte rule requires a parameter (e.g., gte:10)");
    }

    const threshold = parseFloat(params[0]);

    if (isNaN(threshold)) {
      throw new Error(
        `gte rule requires a numeric parameter, got: ${params[0]}`,
      );
    }

    return new GreaterThanOrEqualRule(threshold);
  }
}

export default new GreaterThanOrEqualRuleFactory() as RuleFactory;
