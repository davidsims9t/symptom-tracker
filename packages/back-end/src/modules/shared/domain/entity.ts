import { UniqueEntityID } from "./id";

export abstract class Entity<T> {
    readonly id: UniqueEntityID;
    readonly props: T;

    constructor(props: T, id?: UniqueEntityID) {
        this.id = id ?? String(new UniqueEntityID());
        this.props = props;
    }

    equals(object: Entity<T>) {
        if (object == null) return false;
        return this.id === object.id;
    }
}