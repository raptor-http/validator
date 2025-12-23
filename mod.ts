// Copyright 2025, @briward. All rights reserved. MIT license.

import Middleware from "./src/middleware.ts";
import RuleParser from "./src/rule-parser.ts";

export type { Rule } from "./src/interfaces/rule.ts";
export type { InferSchema } from "./src/middleware.ts";

export { Middleware as Validator, RuleParser };

export { default as RequiredRule } from "./src/rules/required.ts";
export { default as StringRule } from "./src/rules/string.ts";
export { default as NumericRule } from "./src/rules/numeric.ts";
export { default as BooleanRule } from "./src/rules/boolean.ts";
export { default as DecimalRule } from "./src/rules/decimal.ts";
export { default as IntegerRule } from "./src/rules/integer.ts";
export { default as AlphaRule } from "./src/rules/alpha.ts";
export { default as LowercaseRule } from "./src/rules/lowercase.ts";
export { default as UppercaseRule } from "./src/rules/uppercase.ts";
export { default as EmailRule } from "./src/rules/email.ts";

export { default as MinRule } from "./src/rules/min.ts";
export { default as MaxRule } from "./src/rules/max.ts";
export { default as StartsWithRule } from "./src/rules/starts-with.ts";
export { default as EndsWithRule } from "./src/rules/ends-with.ts";
