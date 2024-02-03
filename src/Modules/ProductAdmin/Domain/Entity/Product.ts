import { Id } from "../../../@shared/Domain/ValueObject/Id";

export class Product {
  readonly price: number;
  readonly createdAt: Date = new Date();

  constructor(
    public readonly id: Id,
    public readonly name: string,
    price: number,
    createdAt?: Date,
  ) {
    if (createdAt) {
      this.createdAt = createdAt;
    }
    this.price = Math.trunc(price);
    this.validate();
  }

  getFinalPrice(): number {
    return this.price / 100;
  }

  private validate() {
    if (this.price < 0) throw new Error("Invalid price");
  }
}
