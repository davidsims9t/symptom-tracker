import { expect, test } from "vitest";
import { User } from "../../mocks/aggregate-root";
import { MockDomainEvent } from "../../mocks/domain-event";

test("aggregate root can be extended has expected props and id", () => {
    const props = {
        name: "David",
        age: 33
    };
    const aggregateRoot = new User(props);

    expect(aggregateRoot.props).toEqual(props);
    expect(String(aggregateRoot.id)).toBeTruthy();
});

test("aggregate root can add and clear domain events", () => {
    const props = {
        name: "Jane",
        age: 29
    };
    const aggregateRoot = new User(props);
    const domainEvent = new MockDomainEvent();

    expect(aggregateRoot.domainEvents.length).toBe(0);

    aggregateRoot.addDomainEvent(domainEvent);
    expect(aggregateRoot.domainEvents.length).toBe(1);
    expect(aggregateRoot.domainEvents[0]).toBe(domainEvent);

    aggregateRoot.clearEvents();
    expect(aggregateRoot.domainEvents.length).toBe(0);
});
