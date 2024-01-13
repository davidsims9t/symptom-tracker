import { Result } from "../../shared/core/result";
import ValueObject from "../../shared/domain/value-object";

export type UserPasswordProps = {
    value?: string | null;
};

export class UserPassword extends ValueObject<UserPasswordProps> {
    static minLength = 6;

    get value() {
        return this.props.value;
    }

    isValidPassword() {
        if (!this.props.value) return;
        return this.props.value.length >= UserPassword.minLength;
    }

    constructor(props: UserPasswordProps) {
        super(props);
    }

    static create(props: UserPasswordProps) {
        const password = new UserPassword(props);

        if (props.value && !password.isValidPassword()) {
            return Result.error(`Invalid password. Password must be at least ${UserPassword.minLength} characters.`);
        }

        return Result.ok(password);
    }
}

export default UserPassword;