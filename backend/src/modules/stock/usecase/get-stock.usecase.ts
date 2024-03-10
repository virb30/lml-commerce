import { Usecase } from "@modules/shared/usecase/usecase.interface";
import { StockEntryRepository } from "../domain/repository/stock-entry.repository.interface";
import { StockCalculator } from "../domain/service/stock-calculator.service";
import { Id } from "@modules/shared/domain/value-object/id";

export class GetStockUseCase implements Usecase {
  public constructor(private readonly stockEntryRepository: StockEntryRepository) {}

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

export type GetStockOutput = {
  total: number;
};
