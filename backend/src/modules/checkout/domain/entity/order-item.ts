import { Currency } from "@modules/shared/domain/value-object/currency/currency";
import { Id } from "@modules/shared/domain/value-object/id";

export class OrderItem {
  constructor(
    public productId: Id,
    public price: Currency,
    public amount: number,
  ) {}

  public get total() {
    return this.price.value * this.amount;
  }

  public incrementAmount(amount: number) {
    this.amount += amount;
  }
}
