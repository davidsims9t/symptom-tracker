import { expect, test } from "vitest";
import UserEmail from "../../../src/modules/users/domain/user-email";

test("UserEmail can be created with a valid email", () => {
    const userEmail = UserEmail.create({
        value: "test@example.com"
    });

    expect(userEmail.isSuccessful).toBeTruthy();
    expect(userEmail.isFailure).toBeFalsy();
    expect(userEmail.value.toString()).toBe("test@example.com");
});

test("UserEmail cannot be created with an invalid email", () => {
    const userEmail = UserEmail.create({
        value: "invalid-email"
    });

    expect(userEmail.isSuccessful).toBeFalsy();
    expect(userEmail.isFailure).toBeTruthy();
    expect(userEmail.error).toBe("Invalid email address.");
});
