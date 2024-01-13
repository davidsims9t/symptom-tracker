import { Result } from "../../shared/core/result";
import { AggregateRoot } from "../../shared/domain/aggreate-root";
import { UniqueEntityID } from "../../shared/domain/id";
import { UserProps } from "../../users/domain/user";
import LabResultCreated from "./events/lab-created";
import LabResultDeleted from "./events/lab-deleted";
import LabResultUpdated from "./events/lab-updated";
import ResultStatus from "./result-status";

export type LabResultsProps = {
    name: string;
    // components: 
    isDeleted?: boolean;
    collectedOn?: Date;
    resultOn?: Date;
    reportedOn?: Date;
    user?: UserProps;
    resultStatus?: ResultStatus;
};

export class LabResult extends AggregateRoot<LabResultsProps> {
    constructor(props: LabResultsProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get value() {
        return this.props;
    }

    static create(props: LabResultsProps, id?: UniqueEntityID) {
        const lab = new LabResult({
            ...props,
            isDeleted: !!props.isDeleted,
        }, id);

        if (!id) {
            const userCreated = new LabResultCreated(lab);
            lab.addDomainEvent(userCreated);
        } else {
            const userUpdated = new LabResultUpdated(lab);
            lab.addDomainEvent(userUpdated);
        }

        return Result.ok(lab);
    }

    delete() {
        if (!this.props.isDeleted) {
            const labDeleted = new LabResultDeleted(this);
            this.addDomainEvent(labDeleted);
            this.props.isDeleted = true;
        }
    }
}