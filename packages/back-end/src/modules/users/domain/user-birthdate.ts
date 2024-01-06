import { Result } from "../../shared/core/result";
import ValueObject from "../../shared/domain/value-object";

export type UserBirthDateProps = {
    birthYear: number;
    birthDay: number;
    birthMonth: number;
};

export class UserBirthDate extends ValueObject<UserBirthDateProps> {
    static minAge = 13;

    get value() {
        return new Date(`${this.props.birthMonth}/${this.props.birthDay}/${this.props.birthYear}`);
    }

    isValidAge() {
        const today = new Date();
        const birthDate = this.value;

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age >= UserBirthDate.minAge;
    }

    constructor(props: UserBirthDateProps) {
        super(props);
    }

    static create(props: UserBirthDateProps) {
        const userAge = new UserBirthDate(props);

        if (!userAge.isValidAge()) {
            return Result.error(`User must be at least ${UserBirthDate.minAge} or older to join.`);
        }

        return Result.ok(userAge);
    }
}

export default UserBirthDate;