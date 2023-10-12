export class Email {
    private _value: string;

    constructor(value: string) {
        this._value = value;
        this.validate();
    }

    public get value(): string {
        return this._value;
    }

    private validate(): void {
        const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
        if(!regex.test(this._value)) {
            throw new Error("Invalid email");
        }        
    }
}