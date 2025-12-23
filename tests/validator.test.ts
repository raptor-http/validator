import Validator from "../src/validator.ts";
import { assertEquals, assertExists } from "@std/assert";

Deno.test("validator handles valid string field", () => {
  const validator = new Validator();

  const data = { name: "John Doe" };
  const schema = { name: "string" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
  assertEquals(result.errors, undefined);
});

Deno.test("validator handles invalid string field", () => {
  const validator = new Validator();

  const data = { name: 123 };
  const schema = { name: "string" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertEquals(result.data, undefined);
  assertExists(result.errors);
  assertEquals(result.errors?.name, ["The name field must be a string"]);
});

Deno.test("validator handles valid number field", () => {
  const validator = new Validator();

  const data = { age: 25 };
  const schema = { age: "number" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles invalid number field", () => {
  const validator = new Validator();

  const data = { age: "twenty-five" };
  const schema = { age: "number" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.age, ["The age field must be a number"]);
});

Deno.test("validator handles valid boolean field", () => {
  const validator = new Validator();

  const data = { active: true };
  const schema = { active: "boolean" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles invalid boolean field", () => {
  const validator = new Validator();

  const data = { active: "yes" };
  const schema = { active: "boolean" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.active, ["The active field must be a boolean"]);
});

Deno.test("validator handles required field present", () => {
  const validator = new Validator();

  const data = { email: "test@example.com" };
  const schema = { email: "required|string" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
});

Deno.test("validator handles required field missing", () => {
  const validator = new Validator();

  const data = {};
  const schema = { email: "required|string" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.email, ["The email field is required"]);
});

Deno.test("validator handles required field empty string", () => {
  const validator = new Validator();

  const data = { email: "   " };
  const schema = { email: "required" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.email, ["The email field is required"]);
});

Deno.test("validator handles min length for string (valid)", () => {
  const validator = new Validator();

  const data = { password: "12345678" };
  const schema = { password: "string|min:8" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
});

Deno.test("validator handles min length for string (invalid)", () => {
  const validator = new Validator();

  const data = { password: "1234" };
  const schema = { password: "string|min:8" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.password, [
    "The password field must be at least 8 in length",
  ]);
});

Deno.test("validator handles min value for number (valid)", () => {
  const validator = new Validator();

  const data = { age: 21 };
  const schema = { age: "number|min:18" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
});

Deno.test("validator handles min value for number (invalid)", () => {
  const validator = new Validator();

  const data = { age: 16 };
  const schema = { age: "number|min:18" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.age, [
    "The age field must be at least 18 in length",
  ]);
});

Deno.test("validator handles max length for string (valid)", () => {
  const validator = new Validator();

  const data = { username: "john" };
  const schema = { username: "string|max:20" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
});

Deno.test("validator handles max length for string (invalid)", () => {
  const validator = new Validator();

  const data = { username: "thisusernameiswaytoolongforourvalidation" };
  const schema = { username: "string|max:20" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.username, [
    "The username field must be less than 20 in length",
  ]);
});

Deno.test("validator handles max value for number (valid)", () => {
  const validator = new Validator();

  const data = { score: 95 };
  const schema = { score: "number|max:100" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
});

Deno.test("validator handles max value for number (invalid)", () => {
  const validator = new Validator();

  const data = { score: 150 };
  const schema = { score: "number|max:100" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.score, [
    "The score field must be less than 100 in length",
  ]);
});

Deno.test("validator handles multiple fields with mixed validity", () => {
  const validator = new Validator();

  const data = {
    name: "John",
    age: "not-a-number",
    email: "john@example.com",
  };

  const schema = {
    name: "required|string",
    age: "required|number",
    email: "required|string",
  };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.age, ["The age field must be a number"]);
  assertEquals(result.errors?.name, undefined);
  assertEquals(result.errors?.email, undefined);
});

Deno.test("validator handles multiple validation errors on single field", () => {
  const validator = new Validator();

  const data = { password: 5 };

  const schema = { password: "required|string|min:8" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.password?.length, 2);
  assertEquals(result.errors?.password, [
    "The password field must be a string",
    "The password field must be at least 8 in length",
  ]);
});

Deno.test("validator handles optional field can be undefined", () => {
  const validator = new Validator();

  const data = { name: "John" };

  const schema = { name: "string", bio: "string" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
});

Deno.test("validator handles optional field can be null", () => {
  const validator = new Validator();

  const data = { name: "John", bio: null };

  const schema = { name: "string", bio: "string" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
});

Deno.test("validator handles complex valid scenario", () => {
  const validator = new Validator();

  const data = {
    username: "johndoe",
    email: "john@example.com",
    age: 25,
    subscribed: true,
    bio: "Hello world",
  };

  const schema = {
    username: "required|string|min:3|max:20",
    email: "required|string",
    age: "required|number|min:18|max:120",
    subscribed: "boolean",
    bio: "string|max:500",
  };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
  assertEquals(result.errors, undefined);
});
