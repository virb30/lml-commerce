import { Coupon } from "./Coupon";
import { Id } from "../ValueObjects/Id";

describe("Coupon tests", () => {
  it("Should create an coupon", () => {
    const coupon = new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-01T00:00:00"));
    expect(coupon.id.value).toEqual("1");
    expect(coupon.code).toEqual("VALE10");
    expect(coupon.percentage).toBe(10);
    expect(coupon.discountLimit).toBe(10.0);
    expect(coupon.isValid(new Date())).toBeTruthy();
  });

  it("Should return false for expired coupon", () => {
    const coupon = new Coupon(new Id("1"), "VALE20", 10, 20.0, new Date("2023-11-30T23:59:59"));
    expect(coupon.isValid(new Date("2023-12-01T00:00:00"))).toBeFalsy();
  });

  it("Should return true for not expired coupon", () => {
    const coupon = new Coupon(new Id("1"), "VALE20", 10, 20.0, new Date("2023-11-30T23:59:59"));
    expect(coupon.isValid(new Date("2023-11-30T23:59:59"))).toBeTruthy();
  });
});
