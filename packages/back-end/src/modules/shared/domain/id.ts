import { v4 as uuidv4 } from "uuid";

export class UniqueEntityID {
    #value?: string | number;

    constructor(id?: string | number) {
        this.#value = id || uuidv4();
    }

    toString() {
        return String(this.#value);
    }
}

export default UniqueEntityID;