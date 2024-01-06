import { Result } from "../../shared/core/result";
import ValueObject from "../../shared/domain/value-object";

export type UserNameProps = {
    value: string;
};

export class UserName extends ValueObject<UserNameProps> {
    static maxLength = 15;
    static minLength = 2;

    get value() {
        return this.props.value;
    }

    isValidName() {
        return this.props.value.length >= UserName.minLength && this.props.value.length <= UserName.maxLength;
    }

    constructor(props: UserNameProps) {
        super(props);
    }

    static create(props: UserNameProps) {
        const userName = new UserName(props);

        if (!userName.isValidName()) {
            return Result.error(`Invalid username. Username must be between ${UserName.minLength} and ${UserName.maxLength}.`);
        }

        return Result.ok(userName);
    }
}

export default UserName;