import { ValidateCouponUseCase } from "./validate-coupon.usecase";
import { Coupon } from "../domain/entity/coupon";
import { Id } from "src/modules/shared/domain/value-object/id";
import { CouponRepositoryMemory } from "../repository/memory/coupon.repository";

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

  it("does not validate an expired coupon", async () => {
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

  it("throws an error if coupon not exists", async () => {
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
