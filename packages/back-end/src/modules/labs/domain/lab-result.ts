import { Result } from "../../shared/core/result";
import { AggregateRoot } from "../../shared/domain/aggreate-root";
import { UniqueEntityID } from "../../shared/domain/id";
import { UserProps } from "../../users/domain/user";

export type LabResultsProps = {
    name: string;
    // components: 
    isDeleted?: boolean;
    collectedOn?: Date;
    resultOn?: Date;
    reportedOn?: Date;
    user?: UserProps;
    resultStatus?: "FINAL";
};

export class LabResult extends AggregateRoot<LabResultsProps> {
    constructor(props: LabResultsProps, id?: UniqueEntityID) {
        super(props, id);
    }

    get value() {
        return this.props;
    }

    static create(props: LabResultsProps, id?: UniqueEntityID) {
        const user = new LabResult({
            ...props,
            isDeleted: !!props.isDeleted,
        }, id);

        if (!id) {
            const userCreated = new UserCreated(user);
            user.addDomainEvent(userCreated);
        } else {
            const userUpdated = new UserUpdated(user);
            user.addDomainEvent(userUpdated);
        }

        return Result.ok(user);
    }

    delete() {
        if (!this.props.isDeleted) {
            const userDeleted = new UserDeleted(this);
            this.addDomainEvent(userDeleted);
            this.props.isDeleted = true;
        }
    }

    setAccessToken(token: JWTToken, refreshToken: RefreshToken) {
        const userLogin = new UserLogin(this);
        this.addDomainEvent(userLogin);
        this.props.accessToken = token;
        this.props.refreshToken = refreshToken;
        this.props.lastLogin = new Date();
    }
}