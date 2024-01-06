import { Result } from "../../shared/core/result";
import { AggregateRoot } from "../../shared/domain/aggreate-root";
import { UniqueEntityID } from "../../shared/domain/id";
import UserCreated from "./events/user-created";
import UserDeleted from "./events/user-deleted";
import UserLogin from "./events/user-login";
import UserEmail from "./user-email";
import UserName from "./user-name";
import UserPassword from "./user-password";

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
        }, id);

        if (!id) {
            const userCreated = new UserCreated(user);
            user.addDomainEvent(userCreated);
        }

        return Result.ok(user);
    }

    delete() {
        if (!this.props.isDeleted) {
            const userDeleted = new UserDeleted(this);
            this.addDomainEvent(userDeleted);
            this.props.isDeleted = true;
        }
    }

    setAccessToken(token: JWTToken, refreshToken: RefreshToken) {
        const userLogin = new UserLogin(this);
        this.addDomainEvent(userLogin);
        this.props.accessToken = token;
        this.props.refreshToken = refreshToken;
        this.props.lastLogin = new Date();
    }
}