import { expect, test } from "vitest";
import { User } from "../../../../src/modules/users/domain/user";
import { UserEmail } from "../../../../src/modules/users/domain/user-email";
import { UserBirthDate } from "../../../../src/modules/users/domain/user-birthdate";
import UserUpdated from "../../../../src/modules/users/domain/events/user-updated";

test("UserUpdated event correctly captures the state of the user upon update", () => {
    const userEmail = UserEmail.create({ value: "update@example.com" }).value!;
    const userBirthDate = UserBirthDate.create({
        birthDay: 15,
        birthMonth: 8,
        birthYear: 1995
    }).value!;
    
    const userProps = {
        email: userEmail,
        birthDate: userBirthDate,
        isEmailVerified: false,
        isAdminUser: true,
        isDeleted: false,
        isLocked: true,
        created: new Date(),
        updated: new Date(),
        lastLogin: new Date(),
        firstName: "Jane",
        lastName: "Doe",
        gender: null,
        username: null,
        password: null
    };
    const user = User.create(userProps, "existing-id").value!;
    const userUpdatedEvent = new UserUpdated(user);

    expect(userUpdatedEvent.user).toEqual(user);
    expect(userUpdatedEvent.dateTimeOccurred).toBeInstanceOf(Date);
    expect(userUpdatedEvent.user.props).toEqual(userProps);
});
