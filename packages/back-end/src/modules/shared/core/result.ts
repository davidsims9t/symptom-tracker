export class Result<T> {
    isSuccessful?: boolean;
    isFailure?: boolean;
    #error?: string;
    #value?: T;

    constructor(isSuccessful: boolean, error?: string, value?: T) {
        if (isSuccessful && error) {
            throw new Error("InvalidOperation: A result cannot be successful and contain an error");
        }

        if (!isSuccessful && !error) {
            throw new Error("InvalidOperation: A failing result needs to contain an error message");
        }

        this.isSuccessful = isSuccessful;
        this.isFailure = !isSuccessful;
        this.#error = error;
        this.#value = value;

        Object.freeze(this);
    }

    get value() {
        return this.#value;
    }

    get error() {
        return this.#error;
    }

    static ok = <T>(value?: T) => {
        return new Result(true, undefined, value);
    }

    static error = (value: string) => {
        return new Result(false, value, null);
    }
}