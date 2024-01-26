import { RepositoryFactory } from "../../../Domain/@shared/Factory/RepositoryFactory";
import { StockEntryRepository } from "../Domain/Repository/StockEntryRepository";
import { StockCalculator } from "../Domain/Service/StockCalculator";
import { Id } from "../../../Domain/@shared/ValueObject/Id";

export class GetStockUseCase {
  private stockEntryRepository: StockEntryRepository;
  public constructor(repositoryFactory: RepositoryFactory) {
    this.stockEntryRepository = repositoryFactory.makeStockEntryRepository();
  }

  public async execute(input: GetStockInput): Promise<GetStockOutput> {
    const stockEntries = await this.stockEntryRepository.getByProductId(new Id(input.productId));
    const total = StockCalculator.calculate(stockEntries);
    return {
      total,
    };
  }
}

type GetStockInput = {
  productId: string;
};

type GetStockOutput = {
  total: number;
};
