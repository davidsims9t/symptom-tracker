import { expect, test } from "vitest";
import { UserBirthDate } from "../../../src/modules/users/domain/user-birthdate";

test("UserBirthdate can be created if birthdate is over 13", () => {
    const userBirthDate = UserBirthDate.create({
        birthDay: 25,
        birthMonth: 7,
        birthYear: 1990
    });

    expect(userBirthDate.isSuccessful).toBeTruthy();
    expect(userBirthDate.isFailure).toBeFalsy();
    expect(userBirthDate.value).toEqual({
        props: {
            birthDay: 25,
            birthMonth: 7,
            birthYear: 1990
        }
    });
});

test("UserBirthdate cannot be created if birthdate is less than 13", () => {
    const userBirthDate = UserBirthDate.create({
        birthDay: 25,
        birthMonth: 7,
        birthYear: 2023
    });

    expect(userBirthDate.isSuccessful).toBeFalsy();
    expect(userBirthDate.isFailure).toBeTruthy();
    expect(userBirthDate.error).toEqual("User must be at least 13 or older to join.");
});