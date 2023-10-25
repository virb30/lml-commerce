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
    const discountPercentage = amount * (this.percentage / 100);
    return amount - Math.min(discountPercentage, this.discountLimit);
  }
}
