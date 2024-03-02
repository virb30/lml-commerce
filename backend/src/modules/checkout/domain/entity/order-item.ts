import { Id } from "@modules/shared/domain/value-object/id";

export class OrderItem {
  constructor(
    public productId: Id,
    public price: number,
    public amount: number,
  ) {}

  public get total() {
    return this.price * this.amount;
  }

  public incrementAmount(amount: number) {
    this.amount += amount;
  }
}
