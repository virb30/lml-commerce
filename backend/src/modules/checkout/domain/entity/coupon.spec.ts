import { Coupon } from "./coupon";
import { Id } from "@modules/shared/domain/value-object/id";

describe("Coupon tests", () => {
  it("Create a coupon", () => {
    const props = {
      code: "VALE10",
      percentage: 10,
      discountLimit: 10.0,
      expirationDate: new Date("2023-12-01T00:00:00"),
    };
    const coupon = Coupon.create(props);
    expect(coupon.id).toBeInstanceOf(Id);
    expect(coupon.id.value).toBeDefined();
    expect(coupon.code).toEqual("VALE10");
    expect(coupon.percentage).toBe(10);
    expect(coupon.discountLimit).toBe(10.0);
    expect(coupon.isValid(new Date("2023-11-01T00:00:00"))).toBeTruthy();
  });

  it("Restore a coupon", () => {
    const props = {
      id: new Id("1"),
      code: "VALE10",
      percentage: 10,
      discountLimit: 10.0,
      expirationDate: new Date("2023-12-01T00:00:00"),
    };
    const coupon = Coupon.restore(props);
    expect(coupon.id.value).toEqual("1");
    expect(coupon.code).toEqual("VALE10");
    expect(coupon.percentage).toBe(10);
    expect(coupon.discountLimit).toBe(10.0);
    expect(coupon.isValid(new Date("2023-11-01T00:00:00"))).toBeTruthy();
  });

  it("returns false for expired coupon", () => {
    const props = {
      code: "VALE20",
      percentage: 10,
      discountLimit: 20.0,
      expirationDate: new Date("2023-11-30T23:59:59"),
    };

    const coupon = Coupon.create(props);
    expect(coupon.isValid(new Date("2023-12-01T00:00:00"))).toBeFalsy();
  });

  it("validates a coupon", () => {
    const props = {
      code: "VALE20",
      percentage: 10,
      discountLimit: 20.0,
      expirationDate: new Date("2023-11-30T23:59:59"),
    };
    const coupon = Coupon.create(props);
    expect(coupon.isValid(new Date("2023-11-30T23:59:59"))).toBeTruthy();
  });
});
