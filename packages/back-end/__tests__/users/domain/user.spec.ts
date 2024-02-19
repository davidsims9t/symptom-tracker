import { expect, test } from "vitest";
import { User } from "../../../src/modules/users/domain/user";
import { UserEmail } from "../../../src/modules/users/domain/user-email";
import { UserBirthDate } from "../../../src/modules/users/domain/user-birthdate";
import { UserName } from "../../../src/modules/users/domain/user-name";
import { UserPassword } from "../../../src/modules/users/domain/user-password";
import { UserGender } from "../../../src/modules/users/domain/user-gender";

test("User can be created with valid properties", () => {
    const userEmail = UserEmail.create({ value: "test@example.com" }).value;
    const userBirthDate = UserBirthDate.create({
        birthDay: 25,
        birthMonth: 7,
        birthYear: 1990
    }).value;
    const userName = UserName.create({ value: "ValidName" }).value;
    const userPassword = UserPassword.create({ value: "Valid#Password1" }).value;
    const userGender = UserGender.create({ value: "male" }).value;

    const userProps = {
        email: userEmail!,
        birthDate: userBirthDate!,
        username: userName!,
        password: userPassword,
        gender: userGender,
        isEmailVerified: true,
        isAdminUser: false,
        isDeleted: false,
        isLocked: false,
        created: new Date(),
        updated: new Date(),
        lastLogin: new Date(),
        firstName: "John",
        lastName: "Doe"
    };
    const userResult = User.create(userProps);

    expect(userResult.isSuccessful).toBeTruthy();
    expect(userResult.isFailure).toBeFalsy();
    expect(userResult.value).toEqual({
        id: userResult.value?.id,
        props: userProps
    });
    expect(userResult.value?.domainEvents.length).toBe(1);
    expect(userResult.value?.domainEvents[0].constructor.name).toEqual("UserCreated");
    // @ts-ignore
    expect(userResult.value?.domainEvents[0]?.user).toEqual({
        id: userResult.value?.id,
        props: userProps
    });
});

test("User updated triggers UserUpdated event if an id is provided", () => {
    const userEmail = UserEmail.create({ value: "test@example.com" }).value;
    const userBirthDate = UserBirthDate.create({
        birthDay: 25,
        birthMonth: 7,
        birthYear: 1990
    }).value;
    const userName = UserName.create({ value: "ValidName" }).value;
    const userPassword = UserPassword.create({ value: "Valid#Password1" }).value;
    const userGender = UserGender.create({ value: "male" }).value;

    const userProps = {
        email: userEmail!,
        birthDate: userBirthDate!,
        username: userName!,
        password: userPassword,
        gender: userGender,
        isEmailVerified: true,
        isAdminUser: false,
        isDeleted: false,
        isLocked: false,
        created: new Date(),
        updated: new Date(),
        lastLogin: new Date(),
        firstName: "John",
        lastName: "Doe"
    };
    const userResult = User.create(userProps, "some-id");

    expect(userResult.isSuccessful).toBeTruthy();
    expect(userResult.isFailure).toBeFalsy();
    expect(userResult.value).toEqual({
        id: userResult.value?.id,
        props: userProps
    });
    expect(userResult.value?.domainEvents.length).toBe(1);
    expect(userResult.value?.domainEvents[0].constructor.name).toEqual("UserUpdated");
    // @ts-ignore
    expect(userResult.value?.domainEvents[0]?.user).toEqual({
        id: userResult.value?.id,
        props: userProps
    });
});

test("User deletion triggers UserDeleted event", () => {
    const userEmail = UserEmail.create({ value: "test@example.com" }).value;
    const userBirthDate = UserBirthDate.create({
        birthDay: 25,
        birthMonth: 7,
        birthYear: 1990
    }).value;

    const userResult = User.create({
        email: userEmail!,
        birthDate: userBirthDate!,
        isEmailVerified: true,
        isAdminUser: false,
        isDeleted: false,
        isLocked: false,
        created: new Date(),
        updated: new Date(),
        lastLogin: new Date(),
        firstName: "John",
        lastName: "Doe"
    });

    const user = userResult.value;
    user?.delete();
    expect(user?.props.isDeleted).toBeTruthy();
    expect(user?.domainEvents.length).toBe(2);
    expect(user?.domainEvents[1].constructor.name).toBe("UserDeleted");
});
