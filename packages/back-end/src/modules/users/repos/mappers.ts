import { Result } from "../../shared/core/result";
import UniqueEntityID from "../../shared/domain/id";
import { User, UserProps } from "../domain/user";
import UserBirthDate from "../domain/user-birthdate";
import UserEmail from "../domain/user-email";
import UserGender, { genders } from "../domain/user-gender";
import UserName from "../domain/user-name";
import { UserClerkDto, UserDto, UserPrismaDto } from "../dtos/user";
export const toDomain = (user: UserDto): Result<User> => {
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

    const id = new UniqueEntityID(user.id);

    const result = User.create({
        username: username.value!,
        isAdminUser: user.isAdminUser,
        isDeleted: user.isDeleted,
        isEmailVerified: user.isEmailVerified,
        email: email.value!,
        birthDate: birthDate.value!,
        gender: gender.value!
    }, id);

    return result;
}

export const toDto = (user: User): UserDto => {
    return {
        username: user.value.username.value,
        password: user.value.password?.value,
        email: user.value.email.value,
        birthDay: user.value.birthDate.props.birthDay,
        birthMonth: user.value.birthDate.props.birthMonth,
        birthYear: user.value.birthDate.props.birthYear,
    };
}

export const toPersistence = (user: User): UserPrismaDto => {
    return {};
};

export const fromClerkToDomain = (user: UserClerkDto): UserProps | Error => {
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
    });

    if (domain.isFailure) {
        return new Error(domain.error);
    }

    return domain.value?.value!;
};