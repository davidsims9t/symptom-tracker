import { expect, test } from "vitest";
import ValueObject from "../../../src/modules/shared/domain/value-object";

test("value objects can be compared by values", () => {
    const props = {
        name: "David",
        age: 33
    };
    const vo = new ValueObject(props);
    const vo2 = new ValueObject(props);

    expect(vo.props).toEqual(props);
    expect(vo.equals(vo2)).toBeTruthy();
});