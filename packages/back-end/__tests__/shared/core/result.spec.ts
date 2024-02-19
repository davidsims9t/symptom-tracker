import { describe, it, expect } from "vitest";
import { Result } from "../../../src/modules/shared/core/result";

describe("Result", () => {
  it("should create a successful result without error", () => {
    const result = Result.ok<string>("Success");
    expect(result.isSuccessful).toBe(true);
    expect(result.isFailure).toBe(false);
    expect(result.error).toBeUndefined();
    expect(result.value).toBe("Success");
  });

  it("should create a failure result with an error message", () => {
    const result = Result.error("Failure");
    expect(result.isSuccessful).toBe(false);
    expect(result.isFailure).toBe(true);
    expect(result.error).toBe("Failure");
    expect(result.value).toBeNull();
  });

  it("should throw an error when a successful result is created with an error message", () => {
    expect(() => {
      new Result(true, "Error", "Success");
    }).toThrow("InvalidOperation: A result cannot be successful and contain an error");
  });

  it("should throw an error when a failure result is created without an error message", () => {
    expect(() => {
      new Result(false, undefined, null);
    }).toThrow("InvalidOperation: A failing result needs to contain an error message");
  });
});
