import { Result } from "../../shared/core/result";
import ValueObject from "../../shared/domain/value-object";

const statuses = ["FINAL", "PENDING"];

export type ResultStatusProps = {
    value: typeof statuses[number];
};

export class ResultStatus extends ValueObject<ResultStatusProps> {
    get value() {
        return this.props.value;
    }

    isValidStatus() {
        return statuses.includes(this.value);
    }

    constructor(props: ResultStatusProps) {
        super(props);
    }

    static create(props: ResultStatusProps) {
        const status = new ResultStatus(props);

        if (!status.isValidStatus()) {
            return Result.error(`Lab result status must be one of the following: ${statuses.join(',')}.`);
        }

        return Result.ok(status);
    }
}

export default ResultStatus;