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

Deno.test("validator handles valid numeric field", () => {
  const validator = new Validator();

  const data = { age: 25 };
  const schema = { age: "numeric" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles invalid numeric field", () => {
  const validator = new Validator();

  const data = { age: "twenty-five" };
  const schema = { age: "numeric" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.age, ["The age field must be numeric"]);
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

Deno.test("validator handles valid integer field", () => {
  const validator = new Validator();

  const data = { count: 42 };
  const schema = { count: "integer" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles invalid integer field (decimal)", () => {
  const validator = new Validator();

  const data = { count: 42.5 };
  const schema = { count: "integer" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.count, ["The count field must be an integer"]);
});

Deno.test("validator handles invalid integer field (string)", () => {
  const validator = new Validator();

  const data = { count: "42" };
  const schema = { count: "integer" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.count, ["The count field must be an integer"]);
});

Deno.test("validator handles valid decimal field", () => {
  const validator = new Validator();

  const data = { price: 19.99 };
  const schema = { price: "decimal" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles invalid decimal field (integer)", () => {
  const validator = new Validator();

  const data = { price: 20 };
  const schema = { price: "decimal" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.price, [
    "The price field must be a decimal number",
  ]);
});

Deno.test("validator handles invalid decimal field (string)", () => {
  const validator = new Validator();

  const data = { price: "19.99" };
  const schema = { price: "decimal" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.price, [
    "The price field must be a decimal number",
  ]);
});

Deno.test("validator handles valid alpha field", () => {
  const validator = new Validator();

  const data = { name: "JohnDoe" };
  const schema = { name: "alpha" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles valid alpha field with unicode", () => {
  const validator = new Validator();

  const data = { name: "José" };
  const schema = { name: "alpha" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles invalid alpha field (with numbers)", () => {
  const validator = new Validator();

  const data = { name: "John123" };
  const schema = { name: "alpha" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.name, [
    "The name field must contain only alphabetic characters",
  ]);
});

Deno.test("validator handles invalid alpha field (with spaces)", () => {
  const validator = new Validator();

  const data = { name: "John Doe" };
  const schema = { name: "alpha" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.name, [
    "The name field must contain only alphabetic characters",
  ]);
});

Deno.test("validator handles invalid alpha field (with special chars)", () => {
  const validator = new Validator();

  const data = { name: "John-Doe" };
  const schema = { name: "alpha" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.name, [
    "The name field must contain only alphabetic characters",
  ]);
});

Deno.test("validator handles valid lowercase field", () => {
  const validator = new Validator();

  const data = { username: "johndoe" };
  const schema = { username: "lowercase" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles invalid lowercase field", () => {
  const validator = new Validator();

  const data = { username: "JohnDoe" };
  const schema = { username: "lowercase" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.username, [
    "The username field must be lowercase",
  ]);
});

Deno.test("validator handles valid uppercase field", () => {
  const validator = new Validator();

  const data = { code: "ABC123" };
  const schema = { code: "uppercase" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles invalid uppercase field", () => {
  const validator = new Validator();

  const data = { code: "Abc123" };
  const schema = { code: "uppercase" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.code, ["The code field must be uppercase"]);
});

Deno.test("validator handles valid email field", () => {
  const validator = new Validator();

  const data = { email: "user@example.com" };
  const schema = { email: "email" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles valid email field with subdomains", () => {
  const validator = new Validator();

  const data = { email: "user@mail.example.com" };
  const schema = { email: "email" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles valid email field with plus", () => {
  const validator = new Validator();

  const data = { email: "user+tag@example.com" };
  const schema = { email: "email" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles invalid email field (no @)", () => {
  const validator = new Validator();

  const data = { email: "userexample.com" };
  const schema = { email: "email" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.email, [
    "The email field must be a valid email address",
  ]);
});

Deno.test("validator handles invalid email field (no domain)", () => {
  const validator = new Validator();

  const data = { email: "user@" };
  const schema = { email: "email" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.email, [
    "The email field must be a valid email address",
  ]);
});

Deno.test("validator handles invalid email field (no TLD)", () => {
  const validator = new Validator();

  const data = { email: "user@example" };
  const schema = { email: "email" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.email, [
    "The email field must be a valid email address",
  ]);
});

Deno.test("validator handles valid starts_with field (single prefix)", () => {
  const validator = new Validator();

  const data = { url: "https://example.com" };
  const schema = { url: "starts_with:https" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles valid starts_with field (multiple prefixes)", () => {
  const validator = new Validator();

  const data = { url: "http://example.com" };
  const schema = { url: "starts_with:http,https" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles invalid starts_with field", () => {
  const validator = new Validator();

  const data = { url: "ftp://example.com" };
  const schema = { url: "starts_with:http,https" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.url, [
    'The url field must start with one of: "http", "https"',
  ]);
});

Deno.test("validator handles valid ends_with field (single suffix)", () => {
  const validator = new Validator();

  const data = { email: "user@example.com" };
  const schema = { email: "ends_with:.com" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles valid ends_with field (multiple suffixes)", () => {
  const validator = new Validator();

  const data = { email: "user@example.org" };
  const schema = { email: "ends_with:.com,.org,.net" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
});

Deno.test("validator handles invalid ends_with field", () => {
  const validator = new Validator();

  const data = { email: "user@example.co.uk" };
  const schema = { email: "ends_with:.com,.org" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.email, [
    'The email field must end with one of: ".com", ".org"',
  ]);
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

Deno.test("validator handles min value for numeric (valid)", () => {
  const validator = new Validator();

  const data = { age: 21 };
  const schema = { age: "numeric|min:18" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
});

Deno.test("validator handles min value for numeric (invalid)", () => {
  const validator = new Validator();

  const data = { age: 16 };
  const schema = { age: "numeric|min:18" };

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

Deno.test("validator handles max value for numeric (valid)", () => {
  const validator = new Validator();

  const data = { score: 95 };
  const schema = { score: "numeric|max:100" };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
});

Deno.test("validator handles max value for numeric (invalid)", () => {
  const validator = new Validator();

  const data = { score: 150 };
  const schema = { score: "numeric|max:100" };

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
    age: "required|numeric",
    email: "required|string",
  };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, false);
  assertExists(result.errors);
  assertEquals(result.errors?.age, ["The age field must be numeric"]);
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
    email: "required|string|email",
    age: "required|numeric|min:18|max:120",
    subscribed: "boolean",
    bio: "string|max:500",
  };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
  assertEquals(result.errors, undefined);
});

Deno.test("validator handles complex scenario with new rules", () => {
  const validator = new Validator();

  const data = {
    name: "JohnDoe",
    username: "johndoe",
    code: "ABC123",
    email: "john@example.com",
    website: "https://example.com",
    price: 19.99,
    quantity: 5,
  };

  const schema = {
    name: "required|alpha",
    username: "required|string|lowercase",
    code: "required|uppercase",
    email: "required|email|ends_with:.com,.org",
    website: "required|starts_with:http,https",
    price: "required|decimal",
    quantity: "required|integer",
  };

  const result = validator.validate(data, schema);

  assertEquals(result.valid, true);
  assertEquals(result.data, data);
  assertEquals(result.errors, undefined);
});
