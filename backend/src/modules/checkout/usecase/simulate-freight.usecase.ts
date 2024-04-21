import { RepositoryFactory } from "@modules/checkout/domain/factory/repository-factory.interface";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Id } from "@modules/shared/domain/value-object/id";
import { CalculateFreightGateway } from "../gateway/calculate-freight.gateway.interface";

export class SimulateFreightUseCase {
  private productRepository: ProductRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    private calculateFreightGateway: CalculateFreightGateway,
  ) {
    this.productRepository = repositoryFactory.makeProductRepository();
  }

  async execute(input: SimulateFreightUseCaseInput): Promise<SimulateFreightUseCaseOutput> {
    let orderItems = [];
    for (const item of input.items) {
      const product = await this.productRepository.getById(new Id(item.id));
      orderItems.push({
        volume: product.getVolume(),
        density: product.getDensity(),
        quantity: item.quantity,
      });
    }
    const total = await this.calculateFreightGateway.calculate(orderItems);
    return {
      total,
    };
  }
}

type SimulateFreightUseCaseInput = {
  items: {
    id: string;
    quantity: number;
  }[];
};

type SimulateFreightUseCaseOutput = {
  total: number;
};
