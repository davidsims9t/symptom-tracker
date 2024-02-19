import { expect, test } from "vitest";
import { UserName } from "../../../src/modules/users/domain/user-name";

test("UserName can be created with a valid name", () => {
    const userNameResult = UserName.create({
        value: "ValidName"
    });
    expect(userNameResult.isSuccessful).toBeTruthy();
    expect(userNameResult.isFailure).toBeFalsy();
    expect(userNameResult.value?.props.value).toBe("ValidName");
});

test.skip("UserName cannot be created with an empty name", () => {
    const userNameResult = UserName.create({
        value: ""
    });
    expect(userNameResult.isSuccessful).toBeFalsy();
    expect(userNameResult.isFailure).toBeTruthy();
    expect(userNameResult.error).toBe("Invalid username. Username must be between 2 and 15 characters.");
});

test("UserName cannot be created with a name that is too long", () => {
    const longName = "a".repeat(51);
    const userNameResult = UserName.create({
        value: longName
    });
    expect(userNameResult.isSuccessful).toBeFalsy();
    expect(userNameResult.isFailure).toBeTruthy();
    expect(userNameResult.error).toBe("Invalid username. Username must be between 2 and 15 characters.");
});
