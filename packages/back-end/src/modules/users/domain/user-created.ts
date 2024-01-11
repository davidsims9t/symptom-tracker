import { Result } from "../../shared/core/result";
import ValueObject from "../../shared/domain/value-object";

export type UserCreatedProps = {
    created: Date;
};

export class UserBirthDate extends ValueObject<UserCreatedProps> {
    constructor(props: UserCreatedProps) {
        super(props);
    }

    get value() {
        return;
    }

    static create(props: UserCreatedProps) {
        const today = new Date();
        if (props) {

        }

        return Result.ok();
    }
}

export default UserBirthDate;