import { Coupon } from "./coupon";
import { Id } from "@modules/shared/domain/value-object/id";

describe("Coupon tests", () => {
  it("Create a coupon", () => {
    const coupon = Coupon.create("VALE10", 10, 10.0, new Date("2023-12-01T00:00:00"));
    expect(coupon.id).toBeInstanceOf(Id);
    expect(coupon.id.value).toBeDefined();
    expect(coupon.code).toEqual("VALE10");
    expect(coupon.percentage).toBe(10);
    expect(coupon.discountLimit).toBe(10.0);
    expect(coupon.isValid(new Date("2023-11-01T00:00:00"))).toBeTruthy();
  });

  it("Restore a coupon", () => {
    const coupon = Coupon.restore(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-01T00:00:00"));
    expect(coupon.id.value).toEqual("1");
    expect(coupon.code).toEqual("VALE10");
    expect(coupon.percentage).toBe(10);
    expect(coupon.discountLimit).toBe(10.0);
    expect(coupon.isValid(new Date("2023-11-01T00:00:00"))).toBeTruthy();
  });

  it("returns false for expired coupon", () => {
    const coupon = Coupon.restore(new Id("1"), "VALE20", 10, 20.0, new Date("2023-11-30T23:59:59"));
    expect(coupon.isValid(new Date("2023-12-01T00:00:00"))).toBeFalsy();
  });

  it("validates a coupon", () => {
    const coupon = Coupon.restore(new Id("1"), "VALE20", 10, 20.0, new Date("2023-11-30T23:59:59"));
    expect(coupon.isValid(new Date("2023-11-30T23:59:59"))).toBeTruthy();
  });
});
