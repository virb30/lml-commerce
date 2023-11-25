import { OrderCoupon } from "./OrderCoupon";

describe("OrderCoupon tests", () => {
  it("should create OrderCoupon with limit", () => {
    const coupon = new OrderCoupon("VALE10", 10, 20.0);
    expect(coupon.calculateDiscount(1000)).toBe(20.0);
  });
  it("should create OrderCoupon not limit", () => {
    const coupon = new OrderCoupon("VALE10", 10, 0);
    expect(coupon.calculateDiscount(1000)).toBe(100);
  });
  it("should create OrderCoupon and discount lesser the limit", () => {
    const coupon = new OrderCoupon("VALE10", 10, 500);
    expect(coupon.calculateDiscount(1000)).toBe(100);
  });
});
