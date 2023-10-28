import { Freight } from "../Domain/Entity/Freight";
import { ProductRepository } from "../Domain/Repository/ProductRepository";
import { Id } from "../Domain/ValueObjects/Id";

export class SimulateFreightUseCase {
  constructor(private productRepository: ProductRepository) {}

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
