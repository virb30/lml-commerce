import { Id } from "@modules/shared/domain/value-object/id";

type CouponProps = {
  id: Id;
  code: string;
  percentage: number;
  discountLimit: number;
  expirationDate: Date;
};

export type CouponPropsCreate = Omit<CouponProps, "id">;
export type CouponPropsRestore = CouponProps;

export class Coupon {
  public readonly id: Id;
  public readonly code: string;
  public readonly percentage: number;
  public readonly discountLimit: number;
  public readonly expirationDate: Date;
  private constructor({ id, code, percentage, discountLimit, expirationDate }: CouponProps) {
    this.id = id;
    this.code = code;
    this.percentage = percentage;
    this.discountLimit = discountLimit;
    this.expirationDate = expirationDate;
  }

  public static restore(props: CouponPropsRestore): Coupon {
    return new Coupon(props);
  }

  public static create(props: CouponPropsCreate): Coupon {
    return new Coupon({ id: new Id(), ...props });
  }

  public isValid(now: Date): boolean {
    return now <= this.expirationDate;
  }
}
