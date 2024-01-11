import { expect, test } from "vitest";
import { data as userCreate } from "../../mocks/clerk.json";
import { fromClerkToDomain } from "../../../src/modules/users/repos/mappers";
import { UserProps } from "../../../src/modules/users/domain/user";
import UserEmail from "../../../src/modules/users/domain/user-email";
import UserBirthDate from "../../../src/modules/users/domain/user-birthdate";
import UserGender from "../../../src/modules/users/domain/user-gender";

test("clerk webhook maps to domain ok", () => {
    const domain = fromClerkToDomain(userCreate) as UserProps;

    expect(domain).toEqual({
        isAdminUser: false,
        birthDate: new UserBirthDate({ birthDay: 25, birthMonth: 7, birthYear: 1990 }),
        email: new UserEmail({ value: "example@example.org" }),
        gender: new UserGender({ value: "male" }),
        isDeleted: false,
        isEmailVerified: false,
        username: null
    });
});

test.skip("domain maps to persistence ok", () => {
    const domain = fromClerkToDomain(userCreate);

    expect(domain).toEqual({
        isAdminUser: false,
        birthDate: domain.birthDate,
        email: domain.email,
        isDeleted: false,
        isEmailVerified: false,
        username: null
    });
});