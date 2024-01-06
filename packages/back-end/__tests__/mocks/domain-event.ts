import { DomainEvent } from "../../src/modules/shared/domain/events/domain-event";
import UniqueEntityID from "../../src/modules/shared/domain/id";

export class MockDomainEvent implements DomainEvent {
    dateTimeOccurred: Date;
    
    getAggregateId(): UniqueEntityID {
        return new UniqueEntityID();
    }
}