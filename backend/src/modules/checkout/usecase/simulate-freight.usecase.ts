import { Freight } from "../domain/entity/freight";
import { RepositoryFactory } from "@modules/checkout/domain/factory/repository-factory.interface";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Id } from "@modules/shared/domain/value-object/id";

export class SimulateFreightUseCase {
  private productRepository: ProductRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.productRepository = repositoryFactory.makeProductRepository();
  }

  public async execute(input: SimulateFreightUseCaseInput): Promise<SimulateFreightUseCaseOutput> {
    const freight = new Freight();
    for (const item of input.items) {
      const product = await this.productRepository.getById(new Id(item.id));
      freight.addItem(product, item.quantity);
    }
    const total = freight.getTotal();
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
