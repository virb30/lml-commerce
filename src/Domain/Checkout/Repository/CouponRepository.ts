import { Coupon } from "../Entity/Coupon";

export interface CouponRepository {
  getByCode(code: string): Promise<Coupon>;
  save(coupon: Coupon): Promise<void>;
  clear(): Promise<void>;
}
