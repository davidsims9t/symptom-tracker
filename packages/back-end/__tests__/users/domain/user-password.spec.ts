import { expect, test } from "vitest";
import UserPassword from "../../../src/modules/users/domain/user-password";

test("UserPassword can be created with a valid password", () => {
    const userPassword = UserPassword.create({
        value: "ValidPassword123!"
    });

    expect(userPassword.isSuccessful).toBeTruthy();
    expect(userPassword.isFailure).toBeFalsy();
    expect(userPassword.value?.props.value).toBe("ValidPassword123!");
});

test("UserPassword cannot be created with a too short password", () => {
    const userPassword = UserPassword.create({
        value: "short"
    });

    expect(userPassword.isSuccessful).toBeFalsy();
    expect(userPassword.isFailure).toBeTruthy();
    expect(userPassword.error).toBe("Invalid password. Password must be at least 6 characters and contain one special character.");
});

test("UserPassword cannot be created with a password lacking complexity", () => {
    const userPassword = UserPassword.create({
        value: "alllowercase"
    });

    expect(userPassword.isSuccessful).toBeFalsy();
    expect(userPassword.isFailure).toBeTruthy();
    expect(userPassword.error).toBe("Invalid password. Password must be at least 6 characters and contain one special character.");
});
