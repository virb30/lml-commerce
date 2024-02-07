import { CouponRepository } from "../domain/repository/coupon.repository.interface";

export class ValidateCouponUseCase {
  constructor(private readonly couponRepository: CouponRepository) {}
  public async execute(input: ValidateCouponUseCaseInput): Promise<ValidateCouponUseCaseOutput> {
    const coupon = await this.couponRepository.getByCode(input.code);
    const isValid = coupon.isValid(input.date);
    return { isValid };
  }
}

type ValidateCouponUseCaseOutput = {
  isValid: boolean;
};

type ValidateCouponUseCaseInput = {
  code: string;
  date: Date;
};
