import { Result } from "../../shared/core/result";
import { AggregateRoot } from "../../shared/domain/aggreate-root";
import { UniqueEntityID } from "../../shared/domain/id";

export type UserProps = {
    email: UserEmail;
    username: UserName;
    password: UserPassword;
    isEmailVerified?: boolean;
    isAdminUser?: boolean;
    accessToken?: JWTToken;
    refreshToken?: RefreshToken;
    isDeleted?: boolean;
    lastLogin?: Date;
};

export class User extends AggregateRoot<UserProps> {
    constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    static create(props: UserProps, id?: UniqueEntityID) {
        const user = new User({
            ...props,
            isDeleted: !!props.isDeleted,
            isEmailVerified: !props.isEmailVerified,
            isAdminUser: !props.isAdminUser
        });

        if (!id) {
            user.addDomainEvent();
        }

        return Result.ok(user);
    }
}