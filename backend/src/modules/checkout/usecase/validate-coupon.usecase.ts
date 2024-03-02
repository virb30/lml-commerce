import { Usecase } from "@modules/shared/usecase/usecase.interface";
import { CouponRepository } from "../domain/repository/coupon.repository.interface";
import { RepositoryFactory } from "../domain/factory/repository-factory.interface";

export class ValidateCouponUseCase implements Usecase {
  private couponRepository: CouponRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.couponRepository = repositoryFactory.makeCouponRepository();
  }

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
