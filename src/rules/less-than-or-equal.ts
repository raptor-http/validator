import type { Rule, RuleFactory } from "../interfaces/rule.ts";

/**
 * Validates that a field is less than or equal to a given value.
 */
class LessThanOrEqualRule implements Rule {
  constructor(private threshold: number) {}

  public name(): string {
    return "lte";
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

    return value <= this.threshold;
  }

  public message(field: string): string {
    return `The ${field} field must be less than or equal to ${this.threshold}`;
  }
}

/**
 * Factory for creating LessThanOrEqualRule instances with parameters.
 */
export class LessThanOrEqualRuleFactory implements RuleFactory {
  public make(params: string[]): Rule {
    if (params.length === 0) {
      throw new Error("lte rule requires a parameter (e.g., lte:100)");
    }

    const threshold = parseFloat(params[0]);

    if (isNaN(threshold)) {
      throw new Error(
        `lte rule requires a numeric parameter, got: ${params[0]}`,
      );
    }

    return new LessThanOrEqualRule(threshold);
  }
}

export default new LessThanOrEqualRuleFactory() as RuleFactory;
