import { Id } from "src/modules/shared/domain/value-object/id";
import { Currency } from "src/modules/shared/domain/value-object/currency";

export class Product {
  private _price: Currency;
  readonly createdAt: Date = new Date();
  readonly updatedAt: Date = new Date();

  constructor(
    public readonly id: Id,
    private _name: string,
    price: number,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    if (createdAt) {
      this.createdAt = createdAt;
    }
    if (updatedAt) {
      this.updatedAt = updatedAt;
    }
    this.setPrice(price);
    this.validate();
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  changePrice(price: number) {
    this.setPrice(price);
    this.validate();
  }

  get price(): number {
    return this._price.value;
  }

  getFinalPrice(): number {
    return this._price.value / 100;
  }

  private validate() {
    if (!this._name) throw new Error("Invalid name");
  }

  private setPrice(price: number): void {
    this._price = new Currency(price);
  }
}
