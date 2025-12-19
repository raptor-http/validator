// Copyright 2025, @briward. All rights reserved. MIT license.

import Validate from "./src/validate.ts";
import Validator from "./src/validator.ts";
import RuleParser from "./src/rule-parser.ts";

// Export rule interfaces and types
export type { Rule } from "./src/interfaces/rule.ts";
export type { InferSchema } from "./src/validate.ts";

// Export core classes
export { RuleParser, Validate, Validator };

// Export built-in rules
export { default as RequiredRule } from "./src/rules/required.ts";
export { default as StringRule } from "./src/rules/string.ts";
export { default as NumberRule } from "./src/rules/number.ts";
export { default as BooleanRule } from "./src/rules/boolean.ts";
export { default as MinRule } from "./src/rules/min.ts";
