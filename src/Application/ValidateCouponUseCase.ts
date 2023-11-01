import { CouponRepository } from "../Domain/Repository/CouponRepository";

export class ValidateCouponUseCase {
  constructor(private readonly couponRepository: CouponRepository) {}
  public async execute(input: ValidateCouponUseCaseInput): Promise<ValidateCouponUseCaseOutput> {
    const coupon = await this.couponRepository.getByCode(input.code);
    if (!coupon.isValid(input.date)) {
      throw new Error("Expired coupon");
    }
    return { isValid: true };
  }
}

type ValidateCouponUseCaseOutput = {
  isValid: boolean;
};

type ValidateCouponUseCaseInput = {
  code: string;
  date: Date;
};
