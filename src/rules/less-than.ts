import type { Rule, RuleFactory } from "../interfaces/rule.ts";

/**
 * Validates that a field is less than a given value.
 */
class LessThanRule implements Rule {
  constructor(private threshold: number) {}

  public name(): string {
    return "lt";
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

    return value < this.threshold;
  }

  public message(field: string): string {
    return `The ${field} field must be less than ${this.threshold}`;
  }
}

/**
 * Factory for creating LessThanRule instances with parameters.
 */
export class LessThanRuleFactory implements RuleFactory {
  public make(params: string[]): Rule {
    if (params.length === 0) {
      throw new Error("lt rule requires a parameter (e.g., lt:100)");
    }

    const threshold = parseFloat(params[0]);

    if (isNaN(threshold)) {
      throw new Error(
        `lt rule requires a numeric parameter, got: ${params[0]}`,
      );
    }

    return new LessThanRule(threshold);
  }
}

export default new LessThanRuleFactory() as RuleFactory;
