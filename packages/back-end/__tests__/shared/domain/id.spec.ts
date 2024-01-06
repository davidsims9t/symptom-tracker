import { expect, test } from "vitest";
import UniqueEntityID from "../../../src/modules/shared/domain/id";

test("sets id when initialized without an id", () => {
    const id = new UniqueEntityID();

    expect(String(id)).toBeTruthy();
});

test("sets id when initialized with an id", () => {
    const id = new UniqueEntityID("test");

    expect(String(id)).toBe("test");
});