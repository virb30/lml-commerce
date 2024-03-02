export class Currency {
  private _value: number;

  constructor(value: number) {
    this.setValue(value);
    this.validate();
  }

  static fromFloat(value: number) {
    return new Currency(value * 100);
  }

  private setValue(value: number) {
    this._value = Math.trunc(value);
  }

  get value(): number {
    return this._value;
  }

  private validate() {
    if (this._value < 0) throw new Error("Invalid value");
  }
}
