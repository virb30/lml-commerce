import { Freight } from "../../Domain/Freight/Entity/Freight";
import { RepositoryFactory } from "../../Domain/@shared/Factory/RepositoryFactory";
import { ProductRepository } from "../../Domain/Product/Repository/ProductRepository";
import { Id } from "../../Domain/@shared/ValueObject/Id";

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
