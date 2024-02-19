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
        if (!this.props.value.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)) return;
        if (!this.props.value.match(/[a-z]/) && !this.props.value.match(/[A-Z]/)) return;
        return this.props.value.length >= UserPassword.minLength;
    }

    constructor(props: UserPasswordProps) {
        super(props);
    }

    static create(props: UserPasswordProps) {
        const password = new UserPassword(props);

        if (props.value && !password.isValidPassword()) {
            return Result.error(`Invalid password. Password must be at least ${UserPassword.minLength} characters and contain one special character.`);
        }

        return Result.ok(password);
    }
}

export default UserPassword;