import { expect, test } from "vitest";
import { UserGender } from "../../../src/modules/users/domain/user-gender";

test("UserGender can be created with a valid gender", () => {
    const userGender = UserGender.create({
        value: "male"
    });

    expect(userGender.isSuccessful).toBeTruthy();
    expect(userGender.isFailure).toBeFalsy();
    expect(userGender.value).toEqual({
        props: {
            value: "male"
        }
    });
});

test("UserGender cannot be created with an invalid gender", () => {
    const userGender = UserGender.create({
        value: "invalid" as any
    });

    expect(userGender.isSuccessful).toBeFalsy();
    expect(userGender.isFailure).toBeTruthy();
    expect(userGender.error).toEqual("Invalid gender. Must be one of the following: male, female, neutral, non-binary, agender, transgender, gender-fluid.");
});
