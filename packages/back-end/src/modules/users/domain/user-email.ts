import { Result } from "../../shared/core/result";
import ValueObject from "../../shared/domain/value-object";

export type UserEmailProps = {
    value: Email;
};

export class UserEmail extends ValueObject<UserEmailProps> {
    get value() {
        return this.props.value;
    }

    toString() {
        return this.props.value;
    }

    isValidEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.props.value);
    }

    constructor(props: UserEmailProps) {
        super(props);
    }

    static create(props: UserEmailProps) {
        const userEmail = new UserEmail(props);

        if (!userEmail.isValidEmail()) {
            return Result.error("Invalid email address.");
        }

        return Result.ok(userEmail);
    }
}

export default UserEmail;