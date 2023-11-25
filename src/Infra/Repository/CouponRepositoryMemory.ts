import { Coupon } from "../../Domain/Entity/Coupon";
import { CouponRepository } from "../../Domain/Repository/CouponRepository";

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
      throw new Error("Coupon not found");
    }

    return coupon;
  }

  public async clear(): Promise<void> {
    this.coupons = [];
  }
}
