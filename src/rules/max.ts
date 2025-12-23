import type { Rule, RuleFactory } from "../interfaces/rule.ts";

/**
 * Validates that a field meets a maximum length (for strings) or value (for numbers).
 */
class MaxRule implements Rule {
  constructor(private maximum: number) {}

  public name(): string {
    return "max";
  }

  public validate(
    value: unknown,
    _field: string,
    _data: Record<string, unknown>,
  ): boolean | string {
    if (value === undefined || value === null) {
      return true;
    }

    // For strings, check length
    if (typeof value === "string") {
      return value.length <= this.maximum;
    }

    // For numbers, check value
    if (typeof value === "number") {
      return value <= this.maximum;
    }

    // For arrays, check length
    if (Array.isArray(value)) {
      return value.length <= this.maximum;
    }

    return true;
  }

  public message(field: string): string {
    return `The ${field} field must be less than ${this.maximum} in length`;
  }
}

/**
 * Factory for creating MaxRule instances with parameters.
 */
export class MaxRuleFactory implements RuleFactory {
  public make(params: string[]): Rule {
    if (params.length === 0) {
      throw new Error("max rule requires a parameter (e.g., max:8)");
    }

    const maximum = parseInt(params[0], 10);

    if (isNaN(maximum)) {
      throw new Error(
        `max rule requires a numeric parameter, got: ${params[0]}`,
      );
    }

    return new MaxRule(maximum);
  }
}

// Export an instance of the factory
export default new MaxRuleFactory();
