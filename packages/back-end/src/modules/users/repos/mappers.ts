import { emailAddresses } from "@clerk/clerk-sdk-node";
import UniqueEntityID from "../../shared/domain/id";
import { User } from "../domain/user";
import UserBirthDate from "../domain/user-birthdate";
import UserEmail from "../domain/user-email";
import UserGender, { UserGenderProps, genders } from "../domain/user-gender";
import UserName from "../domain/user-name";
import UserPassword from "../domain/user-password";
import { UserClerkDto, UserDto } from "../dtos/user";
import { User as PrismaUser } from "@prisma/client";
export const toDomain = (user: UserDto): User => {
    const username = UserName.create({
        value: user.username
    });

    if (username.error) {
        throw new Error(username.error);
    }

    const email = UserEmail.create({
        value: user.email
    });

    if (email.error) {
        throw new Error(email.error);
    }

    const birthDate = UserBirthDate.create({
        birthDay: user.birthDay,
        birthMonth: user.birthMonth,
        birthYear: user.birthYear
    });

    if (birthDate.error) {
        throw new Error(birthDate.error);
    }

    const gender = UserGender.create({
        value: user.gender
    });

    if (gender.error) {
        throw new Error(gender.error);
    }
    
    const password = UserPassword.create({
        value: user.password
    });

    if (password.error) {
        throw new Error(password.error);
    }

    const id = new UniqueEntityID(user.id);

    const result = User.create({
        ...user,
        username: username.value!,
        isAdminUser: user.isAdminUser,
        isDeleted: user.isDeleted,
        isEmailVerified: user.isEmailVerified,
        email: email.value!,
        birthDate: birthDate.value!,
        gender: gender.value!,
        password:  password.value!,
    }, id);

    if (result.error) {
        throw new Error(result.error);
    }

    return result.value!;
};

export const fromPersistence = (user: PrismaUser): User => {
    const birthDay = new Date(user.dob);

    const domain = toDomain({
        ...user,
        email: user.email as Email,
        gender: user.gender as UserGenderProps["value"],
        birthMonth: birthDay.getMonth() + 1,
        birthYear: birthDay.getFullYear(),
        birthDay: birthDay.getDate(),
    });

    return domain;
};

export const toPersistence = (user: User): PrismaUser => {
    return {
        isAdminUser: !!user.value.isAdminUser,
        isDeleted: !!user.value.isDeleted,
        isEmailVerified: !!user.value.isEmailVerified,
        email: user.value.email.value,
        createdAt: user.value.created!,
        updatedAt: user.value.updated!,
        dob: user.value.birthDate.value,
        firstName: user.value.firstName!,
        lastName: user.value.lastName!,
        gender: user.value.gender?.value!,
        lastLogin: user.value.lastLogin!,
        username: user.value.username?.value!,
        id: user.id.toString()
    };
};

export const fromClerkToDomain = (user: UserClerkDto): User => {
    const birthday = new Date(user.birthday);

    const domain = toDomain({
        birthDay: birthday.getDate(),
        birthMonth: birthday.getMonth() + 1,
        birthYear: birthday.getFullYear(),
        username: user.username!,
        email: user.email_addresses[0].email_address as unknown as Email,
        firstName: user.first_name,
        lastName: user.last_name,
        gender: user.gender as unknown as typeof genders[number],
        isAdminUser: false,
        isDeleted: false,
        isEmailVerified: !!user.email_addresses?.[0]?.verification,
        createdAt: user.created_at ? new Date(user.created_at) : null,
        updatedAt: user.updated_at ? new Date(user.updated_at) : null,
        lastLogin: user.last_sign_in_at ? new Date(user.last_sign_in_at) : null
    });

    return domain;
};