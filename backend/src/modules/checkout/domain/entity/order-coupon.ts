export class OrderCoupon {
  constructor(
    public code: string,
    public percentage: number,
    public discountLimit: number,
  ) {}

  public calculateDiscount(amount: number): number {
    let discount = amount * (this.percentage / 100);
    if (this.discountLimit !== 0 && discount > this.discountLimit) {
      discount = this.discountLimit;
    }
    return discount;
  }
}
