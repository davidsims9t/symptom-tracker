import { AggregateRoot } from "../../src/modules/shared/domain/aggreate-root";

type UserType = {
    name: string;
    age: number;
};

export class User extends AggregateRoot<UserType> {
}