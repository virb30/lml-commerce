import { Id } from "@modules/shared/domain/value-object/id";

export class Coupon {
  public constructor(
    public readonly id: Id,
    public readonly code: string,
    public readonly percentage: number,
    public readonly discountLimit: number,
    public readonly expirationDate: Date,
  ) {}

  public isValid(now: Date): boolean {
    return now <= this.expirationDate;
  }
}
