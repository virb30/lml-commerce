import { Id } from "@modules/shared/domain/value-object/id";

export class Product {
  private _price: number;
  private _name: string;
  readonly createdAt: Date = new Date();
  readonly updatedAt: Date = new Date();

  constructor(
    public readonly id: Id,
    name: string,
    price: number,
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
    if (!this._name) throw new Error("Invalid name");
  }

  get name(): string {
    return this._name;
  }

  changePrice(price: number): void {
    this._price = price;
    if (this._price < 0) throw new Error("Invalid price");
  }

  get price(): number {
    return this._price;
  }
}
