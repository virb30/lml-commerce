import { ValidateCouponUseCase } from "./ValidateCouponUseCase";
import { Coupon } from "../Domain/Entity/Coupon";
import { Id } from "../Domain/ValueObjects/Id";
import { CouponRepositoryMemory } from "../Infra/Repository/CouponRepositoryMemory";

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

  it("Should validate a coupon code expired and return false", async () => {
    await couponRepository.save(new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-01T00:00:00")));
    const validateCouponUseCase = new ValidateCouponUseCase(couponRepository);
    const payload = {
      code: "VALE10",
      date: new Date("2023-12-02T00:00:00"),
    };
    const result = await validateCouponUseCase.execute(payload);
    expect(result).toEqual({
      isValid: false,
    });
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
