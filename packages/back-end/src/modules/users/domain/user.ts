import { Result } from "../../shared/core/result";
import { AggregateRoot } from "../../shared/domain/aggreate-root";
import { UniqueEntityID } from "../../shared/domain/id";
import UserCreated from "./events/user-created";
import UserDeleted from "./events/user-deleted";
import UserLogin from "./events/user-login";
import UserUpdated from "./events/user-updated";
import UserBirthDate from "./user-birthdate";
import UserEmail from "./user-email";
import UserGender from "./user-gender";
import UserName from "./user-name";
import UserPassword from "./user-password";

export type UserProps = {
    email: UserEmail;
    birthDate: UserBirthDate;
    username?: UserName | null;
    password?: UserPassword | null;
    isEmailVerified?: boolean | null;
    isAdminUser?: boolean | null;
    isDeleted?: boolean | null;
    isLocked?: boolean | null;
    created?: Date | null;
    updated?: Date | null;
    lastLogin?: Date | null;
    firstName?: string | null;
    lastName?: string | null;
    gender?: UserGender | null;
};

export class User extends AggregateRoot<UserProps> {
    constructor(props: UserProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get value() {
        return this.props;
    }

    static create(props: UserProps, id?: UniqueEntityID) {
        const user = new User({
            ...props,
            isDeleted: !!props.isDeleted,
            isEmailVerified: !!props.isEmailVerified,
            isAdminUser: !!props.isAdminUser
        }, id);

        if (!id) {
            const userCreated = new UserCreated(user);
            user.addDomainEvent(userCreated);
        } else {
            const userUpdated = new UserUpdated(user);
            user.addDomainEvent(userUpdated);
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

    setLastLogin() {
        const userLogin = new UserLogin(this);
        this.addDomainEvent(userLogin);
        this.props.lastLogin = new Date();
    }
}