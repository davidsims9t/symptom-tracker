import { expect, test } from "vitest";
import { User } from "../../../mocks/aggregate-root";
import { markAggregateForDispatch, findMarkedAggregateByID, dispatchEventsForAggregate, register, clearHandlers, clearMarkedAggregates } from "../../../../src/modules/shared/domain/events/domain-events";
import { MockDomainEvent } from "../../../mocks/domain-event";
import { DomainEvent } from "../../../../src/modules/shared/domain/events/domain-event";

test("markAggregateForDispatch adds the aggregate to dispatch when called", () => {
    const aggregate = new User({
        name: "David",
        age: 33
    });
    markAggregateForDispatch(aggregate);

    const aggregateFound = findMarkedAggregateByID(aggregate.id);

    expect(aggregateFound).toBe(aggregate);
});

test("dispatchEventsForAggregate dispatches for a given aggregate if marked for dispatch", () => {
    clearHandlers();
    clearMarkedAggregates();
    const aggregate = new User({
        name: "David",
        age: 33
    });
    const domainEvent = new MockDomainEvent();
    aggregate.addDomainEvent(domainEvent);

    let called: DomainEvent | null = null;
    register(
        (event) => {
            called = event;
        },
        domainEvent.constructor.name
    );

    dispatchEventsForAggregate(String(aggregate.id));

    expect(called).toEqual(domainEvent);
});