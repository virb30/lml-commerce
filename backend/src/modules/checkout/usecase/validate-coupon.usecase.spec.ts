import { ValidateCouponUseCase } from "./validate-coupon.usecase";
import { Coupon } from "../domain/entity/coupon";
import { Id } from "@modules/shared/domain/value-object/id";
import { CouponRepositoryMemory } from "../repository/memory/coupon.repository";
import { MemoryRepositoryFactory } from "../repository/factory/memory-repository.factory";
import { NotFoundError } from "@modules/shared/errors/not-found.error";

describe("Validate Coupon Use Case tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  const couponRepository = repositoryFactory.makeCouponRepository();

  beforeEach(async () => {
    await couponRepository.clear();
  });

  it("I should validate an unexpired coupon code", async () => {
    const coupon = Coupon.create({
      code: "VALE10",
      percentage: 10,
      discountLimit: 10.0,
      expirationDate: new Date("2023-12-02T00:00:00"),
    });
    await couponRepository.save(coupon);
    const validateCouponUseCase = new ValidateCouponUseCase(repositoryFactory);
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
    const coupon = Coupon.create({
      code: "VALE10",
      percentage: 10,
      discountLimit: 10.0,
      expirationDate: new Date("2023-12-01T00:00:00"),
    });
    await couponRepository.save(coupon);
    const validateCouponUseCase = new ValidateCouponUseCase(repositoryFactory);
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
      const validateCouponUseCase = new ValidateCouponUseCase(repositoryFactory);
      const payload = {
        code: "VALE10",
        date: new Date("2023-12-02T00:00:00"),
      };
      await validateCouponUseCase.execute(payload);
    }).rejects.toThrowErrorTypeWithMessage(NotFoundError, "Coupon not found");
  });
});
