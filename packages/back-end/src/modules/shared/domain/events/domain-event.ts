import { UniqueEntityID } from "../id";

export interface DomainEvent {
    dateTimeOccurred: Date;
    getAggregateId(): UniqueEntityID;
};