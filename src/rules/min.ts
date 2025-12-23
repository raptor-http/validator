import type { Rule, RuleFactory } from "../interfaces/rule.ts";

/**
 * Validates that a field meets a minimum length (for strings) or value (for numbers).
 */
class MinRule implements Rule {
  constructor(private minimum: number) {}

  public name(): string {
    return "min";
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
      return value.length >= this.minimum;
    }

    // For numbers, check value
    if (typeof value === "number") {
      return value >= this.minimum;
    }

    // For arrays, check length
    if (Array.isArray(value)) {
      return value.length >= this.minimum;
    }

    return true;
  }

  public message(field: string): string {
    return `The ${field} field must be at least ${this.minimum} in length`;
  }
}

/**
 * Factory for creating MinRule instances with parameters.
 */
export class MinRuleFactory implements RuleFactory {
  public make(params: string[]): Rule {
    if (params.length === 0) {
      throw new Error("min rule requires a parameter (e.g., min:8)");
    }

    const minimum = parseInt(params[0], 10);

    if (isNaN(minimum)) {
      throw new Error(
        `min rule requires a numeric parameter, got: ${params[0]}`,
      );
    }

    return new MinRule(minimum);
  }
}

// Export an instance of the factory
export default new MinRuleFactory();
