import { Result } from "../../shared/core/result";
import ValueObject from "../../shared/domain/value-object";

export type UserPasswordProps = {
    value: Email;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
    static minLength = 6;

    get value() {
        return this.props.value;
    }

    isValidPassword() {
        return this.props.value.length >= UserPassword.minLength;
    }

    constructor(props: UserPasswordProps) {
        super(props);
    }

    static create(props: UserPasswordProps) {
        const userName = new UserPassword(props);

        if (!userName.isValidPassword()) {
            return Result.error(`Invalid password. Password must be at least ${UserPassword.minLength} characters.`);
        }

        return Result.ok(userName);
    }
}

export default UserPassword;