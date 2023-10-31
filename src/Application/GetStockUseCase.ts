import { StockEntryRepository } from "../Domain/Repository/StockEntryRepository";
import { StockCalculator } from "../Domain/Service/StockCalculator";
import { Id } from "../Domain/ValueObjects/Id";

export class GetStockUseCase {
  public constructor(private stockEntryRepository: StockEntryRepository) {}

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
