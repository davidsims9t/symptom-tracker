import { Result } from "../../shared/core/result";
import ValueObject from "../../shared/domain/value-object";

export type UserNameProps = {
    value?: string | null;
};

export class UserName extends ValueObject<UserNameProps> {
    static maxLength = 15;
    static minLength = 2;

    get value() {
        return this.props.value;
    }

    isValidName() {
        if (!this.props.value) return false;
        return this.props.value.length >= UserName.minLength && this.props.value.length <= UserName.maxLength;
    }

    constructor(props: UserNameProps) {
        super(props);
    }

    static create(props: UserNameProps) {
        if (!props.value) {
            return Result.ok(null);
        }

        const userName = new UserName(props);

        if (!userName.isValidName()) {
            return Result.error(`Invalid username. Username must be between ${UserName.minLength} and ${UserName.maxLength} characters.`);
        }

        return Result.ok(userName);
    }
}

export default UserName;