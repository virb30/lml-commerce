import { Id } from "@modules/shared/domain/value-object/id";

export class Coupon {
  private constructor(
    public readonly id: Id,
    public readonly code: string,
    public readonly percentage: number,
    public readonly discountLimit: number,
    public readonly expirationDate: Date,
  ) {}

  public static restore(id: Id, code: string, percentage: number, discountLimit: number, expirationDate: Date): Coupon {
    return new Coupon(id, code, percentage, discountLimit, expirationDate);
  }

  public static create(code: string, percentage: number, discountLimit: number, expirationDate: Date): Coupon {
    return new Coupon(new Id(), code, percentage, discountLimit, expirationDate);
  }

  public isValid(now: Date): boolean {
    return now <= this.expirationDate;
  }
}
