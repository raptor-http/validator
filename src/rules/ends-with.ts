import type { Rule, RuleFactory } from "../interfaces/rule.ts";

/**
 * Validates that a field ends with one of the given values.
 */
class EndsWithRule implements Rule {
  constructor(private suffixes: string[]) {}

  public name(): string {
    return "ends_with";
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

    return this.suffixes.some((suffix) => value.endsWith(suffix));
  }

  public message(field: string): string {
    const suffixList = this.suffixes.map((s) => `"${s}"`).join(", ");
    return `The ${field} field must end with one of: ${suffixList}`;
  }
}

/**
 * Factory for creating EndsWithRule instances with parameters.
 */
export class EndsWithRuleFactory implements RuleFactory {
  public make(params: string[]): Rule {
    if (params.length === 0) {
      throw new Error(
        "ends_with rule requires at least one parameter (e.g., ends_with:.com,.org)",
      );
    }

    return new EndsWithRule(params);
  }
}

export default new EndsWithRuleFactory();
