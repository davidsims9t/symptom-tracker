import UniqueEntityID from "../../shared/domain/id";
import { User } from "../domain/user";
import UserName from "../domain/user-name";
import { UserDto, UserPrismaDto } from "../dtos/user";

export const toDomain = (user: UserDto): User => {
    const username = UserName.create({
        value: user.username
    });

    if (username.error) {
        throw new Error(username.error);
    }

    const id = new UniqueEntityID(user.id);

    const result = new User({
        username: username.value,
        isAdminUser: user.isAdminUser,
        isDeleted: user.isDeleted,
        isEmailVerified: user.isEmailVerified
    }, id);

    return result;
}

export const toDto = (user: User): UserDto => {
    return {
        username: user.value.username.value,
        password: user.value.password.value,
        email: user.value.email.value,
        birthDay: user.value.birthDate.props.birthDay,
        birthMonth: user.value.birthDate.props.birthMonth,
        birthYear: user.value.birthDate.props.birthYear,
    };
}

export const toPersistence = (user: User): UserPrismaDto => {
    return {};
};