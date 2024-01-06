import { expect, test } from "vitest";
import { User } from "../../mocks/aggregate-root";

test("aggregate root can be extended has expected props and id", () => {
    const props = {
        name: "David",
        age: 33
    };
    const aggregateRoot = new User(props);

    expect(aggregateRoot.props).toEqual(props);
    expect(String(aggregateRoot.id)).toBeTruthy();
});