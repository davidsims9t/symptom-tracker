import { expect, test } from "vitest";
import { User } from "../../mocks/entity";

test("entity root can be extended has expected props and id", () => {
    const props = {
        name: "David",
        age: 33
    };
    const entity = new User(props);

    expect(entity.props).toEqual(props);
    expect(String(entity.id)).toBeTruthy();
});

test("two entities with different ids are not equal", () => {
    const props = {
        name: "David",
        age: 33
    };
    const entity = new User(props);
    const entity2 = new User(props);

    expect(entity.equals(entity2)).toBeFalsy();
});