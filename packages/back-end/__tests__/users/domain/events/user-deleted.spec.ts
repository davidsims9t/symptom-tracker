import { expect, test } from "vitest";
import { User } from "../../../../src/modules/users/domain/user";
import { UserEmail } from "../../../../src/modules/users/domain/user-email";
import { UserBirthDate } from "../../../../src/modules/users/domain/user-birthdate";
import UserDeleted from "../../../../src/modules/users/domain/events/user-deleted";

test("UserDeleted event correctly captures the state of the user upon deletion", () => {
    const userEmail = UserEmail.create({ value: "delete@example.com" }).value!;
    const userBirthDate = UserBirthDate.create({
        birthDay: 10,
        birthMonth: 10,
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
        firstName: "Deleted",
        lastName: "User",
        gender: null,
        username: null,
        password: null
    };
    const user = User.create(userProps, "delete-id").value!;
    user.delete();
    const userDeletedEvent = new UserDeleted(user);

    expect(userDeletedEvent.user).toEqual(user);
    expect(userDeletedEvent.dateTimeOccurred).toBeInstanceOf(Date);
    expect(userDeletedEvent.user.props.isDeleted).toBeTruthy();
});
