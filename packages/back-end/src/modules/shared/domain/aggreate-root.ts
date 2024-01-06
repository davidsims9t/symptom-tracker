import { Entity } from "./entity";
import { DomainEvent } from "./events/domain-event";
import { markAggregateForDispatch } from "./events/domain-events";

export abstract class AggregateRoot<T> extends Entity<T> {
    #domainEvents: DomainEvent[] = [];

    get domainEvents(): DomainEvent[] {
        return this.#domainEvents;
    }

    clearEvents() {
        this.#domainEvents.splice(0, this.#domainEvents.length);
    }

    addDomainEvent(domainEvent: DomainEvent) {
        this.#domainEvents.push(domainEvent);

        markAggregateForDispatch(this);
    }
}

export default AggregateRoot;