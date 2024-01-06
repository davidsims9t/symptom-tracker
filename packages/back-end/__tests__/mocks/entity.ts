import { Entity } from "../../src/modules/shared/domain/entity";

type UserProps = {
    name: string;
    age: number;
};

export class User extends Entity<UserProps> {

}