import { Result } from "../../shared/core/result";
import ValueObject from "../../shared/domain/value-object";
import { UserDto } from "../dtos/user";

export const genders = ["male", "female", "neutral", "non-binary", "agender", "transgender", "gender-fluid"] as UserDto["gender"][];
export type UserGenderProps = {
    value?: typeof genders[number] | null;
};

export class UserGender extends ValueObject<UserGenderProps> {
    get value() {
        return this.props.value;
    }

    isValidGender() {
        if (!this.props.value) return false;
        return genders.includes(this.props.value);
    }

    constructor(props: UserGenderProps) {
        super(props);
    }

    static create(props: UserGenderProps) {
        if (!props.value) {
            return Result.ok(null);
        }

        const userGender = new UserGender(props);

        if (!userGender.isValidGender()) {
            return Result.error(`Invalid gender. Must be one of the following: ${genders.join(', ')}.`);
        }

        return Result.ok(userGender);
    }
}

export default UserGender;