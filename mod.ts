// Copyright 2025, @briward. All rights reserved. MIT license.

import Middleware from "./src/middleware.ts";
import RuleParser from "./src/rule-parser.ts";

export type { Rule } from "./src/interfaces/rule.ts";
export type { InferSchema } from "./src/middleware.ts";

export { Middleware as Validator, RuleParser };

export { default as RequiredRule } from "./src/rules/required.ts";
export { default as StringRule } from "./src/rules/string.ts";
export { default as NumberRule } from "./src/rules/number.ts";
export { default as BooleanRule } from "./src/rules/boolean.ts";
export { default as MinRule } from "./src/rules/min.ts";
export { default as MaxRule } from "./src/rules/max.ts";
