import { ValidateCouponUseCase } from "../src/Application/ValidateCouponUseCase";
import Coupon from "../src/Domain/Entity/Coupon";
import { Id } from "../src/Domain/ValueObjects/Id";
import { CouponRepositoryMemory } from "../src/Infra/Repository/CouponRepositoryMemory";

describe("Validate Coupon Use Case tests", () => {
  const couponRepository = new CouponRepositoryMemory();

  beforeEach(async () => {
    await couponRepository.clear();
  });

  it("I should validate an unexpired coupon code", async () => {
    await couponRepository.save(new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-02T00:00:00")));
    const validateCouponUseCase = new ValidateCouponUseCase(couponRepository);
    const payload = {
      code: "VALE10",
      date: new Date("2023-12-01T00:00:00"),
    };
    const result = await validateCouponUseCase.execute(payload);
    expect(result).toEqual({
      isValid: true,
    });
  });

  it("Should validate a coupon code and return that it has expired", async () => {
    expect(async () => {
      await couponRepository.save(new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-01T00:00:00")));
      const validateCouponUseCase = new ValidateCouponUseCase(couponRepository);
      const payload = {
        code: "VALE10",
        date: new Date("2023-12-02T00:00:00"),
      };
      await validateCouponUseCase.execute(payload);
    }).rejects.toThrow(new Error("Expired coupon"));
  });

  it("Should validate a coupon code and return that it not found", async () => {
    expect(async () => {
      const validateCouponUseCase = new ValidateCouponUseCase(couponRepository);
      const payload = {
        code: "VALE10",
        date: new Date("2023-12-02T00:00:00"),
      };
      await validateCouponUseCase.execute(payload);
    }).rejects.toThrow(new Error("Coupon not found"));
  });
});