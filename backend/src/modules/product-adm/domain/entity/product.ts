import { Currency } from "@modules/shared/domain/value-object/currency/currency";
import { Id } from "@modules/shared/domain/value-object/id";
import { InputError } from "@modules/shared/errors/input.error";

export class Product {
  private _price: Currency;
  private _name: string;
  readonly createdAt: Date = new Date();
  readonly updatedAt: Date = new Date();

  constructor(
    public readonly id: Id,
    name: string,
    price: Currency,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    if (createdAt) this.createdAt = createdAt;
    if (updatedAt) this.updatedAt = updatedAt;
    this.changeName(name);
    this.changePrice(price);
  }

  changeName(name: string): void {
    this._name = name;
    if (!this._name) throw new InputError("Invalid name");
  }

  get name(): string {
    return this._name;
  }

  changePrice(price: Currency): void {
    this._price = price;
  }

  get price(): Currency {
    return this._price;
  }
}
