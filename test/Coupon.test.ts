import Coupon from "../src/Domain/Entity/Coupon";
import { Id } from "../src/Domain/ValueObjects/Id";

describe("Coupon tests", () => {
  it("Should create an coupon", () => {
    const coupon = new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-01T00:00:00"));
    expect(coupon.id.value).toEqual("1");
    expect(coupon.code).toEqual("VALE10");
    expect(coupon.percentage).toBe(10);
    expect(coupon.discountLimit).toBe(10.0);
    expect(coupon.isExpired(new Date())).toBeTruthy();
  });

  it("Should return false for expired coupon", () => {
    const coupon = new Coupon(new Id("1"), "VALE20", 10, 20.0, new Date("2023-11-30T23:59:59"));
    expect(coupon.isExpired(new Date("2023-12-01T00:00:00"))).toBeFalsy();
  });

  it("Should return true for not expired coupon", () => {
    const coupon = new Coupon(new Id("1"), "VALE20", 10, 20.0, new Date("2023-11-30T23:59:59"));
    expect(coupon.isExpired(new Date("2023-11-30T23:59:59"))).toBeTruthy();
  });

  it("Should calculate the discount value", () => {
    const coupon = new Coupon(new Id("1"), "VALE20", 10, 20.0, new Date("2023-11-30T23:59:59"));
    expect(coupon.calculateDiscount(100)).toBe(90);
  });

  it("Should calculate discount without exceeding limit", () => {
    const coupon = new Coupon(new Id("1"), "VALE20", 50, 20.0, new Date("2023-11-30T23:59:59"));
    expect(coupon.calculateDiscount(100)).toBe(80);
  });
});
