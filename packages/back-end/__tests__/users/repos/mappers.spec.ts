import { expect, test } from "vitest";
import { data as userCreate } from "../../mocks/clerk.json";
import { fromClerkToDomain, toPersistence } from "../../../src/modules/users/repos/mappers";
import UserEmail from "../../../src/modules/users/domain/user-email";
import UserBirthDate from "../../../src/modules/users/domain/user-birthdate";
import UserGender from "../../../src/modules/users/domain/user-gender";
import UserPassword from "../../../src/modules/users/domain/user-password";

test("clerk webhook maps to domain ok", () => {
    const domain = fromClerkToDomain(userCreate);

    expect(domain.value).toEqual({
        isAdminUser: false,
        birthDate: new UserBirthDate({ birthDay: 25, birthMonth: 7, birthYear: 1990 }),
        email: new UserEmail({ value: "example@example.org" }),
        gender: new UserGender({ value: "male" }),
        isDeleted: false,
        isEmailVerified: true,
        username: null,
        firstName: "Example",
        lastName: "Example",
        password: new UserPassword({ value: undefined }),
        birthDay: 25,
        birthMonth: 7,
        birthYear: 1990,
        createdAt: new Date(1654012591514),
        updatedAt: new Date(1654012591835),
        lastLogin: new Date(1654012591514)
    });
});

test("domain maps to persistence ok", () => {
    const domain = fromClerkToDomain(userCreate);
    const persistence = toPersistence(domain);

    expect(persistence).toEqual({
        isAdminUser: false,
        dob: new Date("07-25-1990"),
        email: "example@example.org",
        isDeleted: false,
        isEmailVerified: true,
        username: undefined,
        id: domain.id.toString(),
        createdAt: undefined,
        firstName: "Example",
        lastName: "Example",
        gender: "male",
        lastLogin: new Date(1654012591514),
        updatedAt: undefined,
    });
});