import { v4 as uuidv4 } from 'uuid'

export class Id {
    private _value: string;
    constructor(value?: string) {
        this._value = value ? value : uuidv4()
    }

    public get value(): string {
        return this._value;
    }
}