import { AggregateRoot } from "../aggreate-root";
import { UniqueEntityID } from "../id";
import { DomainEvent } from "./domain-event";

type Callback = (event: DomainEvent) => void;
const handlersMap = new Map<string, Callback[]>();
const markedAggregates: AggregateRoot<any>[] = [];

export const markAggregateForDispatch = <T>(aggregate: AggregateRoot<T>) => {
    const aggregateFound = findMarkedAggregateByID(aggregate.id);

    if (!aggregateFound) {
        markedAggregates.push(aggregate);
    }
};

export const dispatchEventsForAggregate = (id: UniqueEntityID) => {
    const aggregate = findMarkedAggregateByID(id);

    if (aggregate) {
        dispatchAggregateEvents(aggregate);
        aggregate.clearEvents();
        removeAggregateFromMarkedDispatchList(aggregate);
    }
};

const removeAggregateFromMarkedDispatchList = <T>(aggregate: AggregateRoot<T>) => {
    const index = markedAggregates.findIndex((a) => a.equals(aggregate));
    markedAggregates.splice(index, 1);
};

export const findMarkedAggregateByID = <T>(id: UniqueEntityID): AggregateRoot<T> | undefined => {
    return markedAggregates.find(aggregate => {
        return aggregate.id === id
    });
};

const dispatchAggregateEvents = <T>(aggregate: AggregateRoot<T>) => {
    aggregate.domainEvents.forEach((event: DomainEvent) => dispatch(event));
};

const dispatch = (event: DomainEvent) => {
    const eventClassName = event.constructor.name;

    if (handlersMap.has(eventClassName)) {
        const handlers = handlersMap.get(eventClassName);

        handlers?.forEach(handler => {
            handler(event);
        });
    } else {
        throw new Error(`Unregistered event: ${eventClassName}.`);
    }
};

export const clearHandlers = () => {
    handlersMap.clear();
};

export const clearMarkedAggregates = () => {
    markedAggregates.splice(0, markedAggregates.length);
};

export const register = (callback: Callback, eventClassName: string) => {
    if (!handlersMap.has(eventClassName)) {
        handlersMap.set(eventClassName, []);
    }

    handlersMap.set(eventClassName, [...handlersMap.get(eventClassName)!, callback]);
};