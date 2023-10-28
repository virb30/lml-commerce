import { Id } from "../ValueObjects/Id";

export default class Coupon {
  public constructor(
    public readonly id: Id,
    public readonly code: string,
    public readonly percentage: number,
    public readonly discountLimit: number,
    public readonly expirationDate: Date,
  ) {}

  public isExpired(now: Date): boolean {
    return now <= this.expirationDate;
  }

  public calculateDiscount(amount: number): number {
    let discount = amount * (this.percentage / 100);
    if (this.discountLimit !== 0 && discount > this.discountLimit) {
      discount = this.discountLimit;
    }
    return amount - discount;
  }
}
