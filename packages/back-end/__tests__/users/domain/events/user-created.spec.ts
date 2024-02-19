import { expect, test } from "vitest";
import { User } from "../../../../src/modules/users/domain/user";
import { UserEmail } from "../../../../src/modules/users/domain/user-email";
import { UserBirthDate } from "../../../../src/modules/users/domain/user-birthdate";
import UserCreated from "../../../../src/modules/users/domain/events/user-created";

test("UserCreated event correctly captures the state of the user upon creation", () => {
    const userEmail = UserEmail.create({ value: "test@example.com" }).value!;
    const userBirthDate = UserBirthDate.create({
        birthDay: 25,
        birthMonth: 7,
        birthYear: 1990
    }).value!;
    
    const userProps = {
        email: userEmail,
        birthDate: userBirthDate,
        isEmailVerified: true,
        isAdminUser: false,
        isDeleted: false,
        isLocked: false,
        created: new Date(),
        updated: new Date(),
        lastLogin: new Date(),
        firstName: "John",
        lastName: "Doe",
        gender: null,
        username: null,
        password: null
    };
    const user = User.create(userProps).value!;
    const userCreatedEvent = new UserCreated(user);

    expect(userCreatedEvent.user).toEqual(user);
    expect(userCreatedEvent.dateTimeOccurred).toBeInstanceOf(Date);
    expect(userCreatedEvent.user.props).toEqual(userProps);
});
