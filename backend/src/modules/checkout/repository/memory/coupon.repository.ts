import { NotFoundError } from "@modules/shared/errors/not-found.error";
import { Coupon } from "../../domain/entity/coupon";
import { CouponRepository } from "../../domain/repository/coupon.repository.interface";

export class CouponRepositoryMemory implements CouponRepository {
  private coupons: Coupon[] = [];

  public async save(coupon: Coupon): Promise<void> {
    this.coupons.push(coupon);
  }

  public async getByCode(code: string): Promise<Coupon> {
    const coupon = this.coupons.find((coupon) => {
      return coupon.code === code;
    });

    if (!coupon) {
      throw new NotFoundError("Coupon not found");
    }

    return coupon;
  }

  public async clear(): Promise<void> {
    this.coupons = [];
  }
}
