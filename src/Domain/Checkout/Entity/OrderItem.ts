import { Id } from "../../@shared/ValueObject/Id";
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
