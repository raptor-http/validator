import type { Rule, RuleFactory } from "./interfaces/rule.ts";

import StringRule from "./rules/string.ts";
import NumberRule from "./rules/number.ts";
import BooleanRule from "./rules/boolean.ts";
import RequiredRule from "./rules/required.ts";
import minFactory from "./rules/min.ts";

/**
 * Parses and manages validation rules.
 */
export default class RuleParser {
  /**
   * Registry of available rules (non-parameterized).
   */
  private rules: Map<string, Rule> = new Map();

  /**
   * Registry of rule factories (parameterized rules).
   */
  private factories: Map<string, RuleFactory> = new Map();

  /**
   * Initialize the rule parser with default rules.
   */
  constructor() {
    this.registerDefaultRules();
    this.registerDefaultFactories();
  }

  /**
   * Register a non-parameterized validation rule.
   *
   * @param rule The rule instance to register.
   */
  public register(rule: Rule): void {
    this.rules.set(rule.name(), rule);
  }

  /**
   * Register a parameterized rule factory.
   *
   * @param name The base name of the rule (e.g., "min" for "min:8").
   * @param factory The factory instance to register.
   */
  public registerFactory(name: string, factory: RuleFactory): void {
    this.factories.set(name, factory);
  }

  /**
   * Parse a pipe-separated rule string into Rule instances.
   *
   * @param ruleString A pipe-separated string of rule names (e.g., "required|string|min:8").
   * @returns An array of Rule instances.
   */
  public parse(ruleString: string): Rule[] {
    const ruleNames = ruleString.split("|").map((r) => r.trim());
    const parsedRules: Rule[] = [];

    for (const ruleName of ruleNames) {
      // Check if this is a parameterized rule (contains ":")
      if (ruleName.includes(":")) {
        const rule = this.parseParameterizedRule(ruleName);
        parsedRules.push(rule);
        continue;
      }

      // Try to find a non-parameterized rule
      const rule = this.rules.get(ruleName);

      if (!rule) {
        throw new Error(`Unknown validation rule: ${ruleName}`);
      }

      parsedRules.push(rule);
    }

    return parsedRules;
  }

  /**
   * Parse a parameterized rule string and create an instance.
   *
   * @param ruleString A rule string with parameters (e.g., "min:8").
   * @returns A Rule instance.
   */
  private parseParameterizedRule(ruleString: string): Rule {
    const [name, ...paramParts] = ruleString.split(":");
    const params = paramParts.join(":").split(",").map((p) => p.trim());

    const factory = this.factories.get(name);

    if (!factory) {
      throw new Error(
        `Unknown parameterized rule: ${name}. Did you forget to register the factory?`,
      );
    }

    return factory.make(params);
  }

  /**
   * Check if a rule or factory exists in the registry.
   *
   * @param ruleName The name of the rule to check.
   * @returns True if the rule or factory exists.
   */
  public has(ruleName: string): boolean {
    if (ruleName.includes(":")) {
      const [name] = ruleName.split(":");
      return this.factories.has(name);
    }

    return this.rules.has(ruleName);
  }

  /**
   * Register the default validation rules.
   */
  private registerDefaultRules(): void {
    this.register(new RequiredRule());
    this.register(new StringRule());
    this.register(new NumberRule());
    this.register(new BooleanRule());
  }

  /**
   * Register the default rule factories.
   */
  private registerDefaultFactories(): void {
    this.registerFactory("min", minFactory);
  }
}
