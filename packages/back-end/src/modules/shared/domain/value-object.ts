type ValueObjectProps = {
    [index: string]: any;
};

export class ValueObject<T extends ValueObjectProps> {
    props: T;

    constructor(props: T) {
        this.props = props;
    }

    equals(vo?: ValueObject<T>): boolean {
        if (vo == null) return false;
        if (vo?.props == null) return false;

        return JSON.stringify(this.props) === JSON.stringify(vo.props);
    }
}

export default ValueObject;