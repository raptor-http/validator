import type { Rule, RuleFactory } from "../interfaces/rule.ts";

/**
 * Validates that a field starts with one of the given values.
 */
class StartsWithRule implements Rule {
  constructor(private prefixes: string[]) {}

  public name(): string {
    return "starts_with";
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

    return this.prefixes.some((prefix) => value.startsWith(prefix));
  }

  public message(field: string): string {
    const prefixList = this.prefixes.map((p) => `"${p}"`).join(", ");
    return `The ${field} field must start with one of: ${prefixList}`;
  }
}

/**
 * Factory for creating StartsWithRule instances with parameters.
 */
export class StartsWithRuleFactory implements RuleFactory {
  public make(params: string[]): Rule {
    if (params.length === 0) {
      throw new Error(
        "starts_with rule requires at least one parameter (e.g., starts_with:http,https)",
      );
    }

    return new StartsWithRule(params);
  }
}

export default new StartsWithRuleFactory() as RuleFactory;
