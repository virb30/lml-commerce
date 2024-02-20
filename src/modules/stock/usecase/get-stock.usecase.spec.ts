import { GetStockUseCase } from "./get-stock.usecase";
import { StockEntry } from "../domain/entity/stock-entry.entity";
import { Id } from "src/modules/shared/domain/value-object/id";
import { StockEntryRepositoryMemory } from "../repository/memory/stock-entry.repository";

describe("GetStockUseCase tests", () => {
  const stockEntryRepository = new StockEntryRepositoryMemory();

  beforeEach(async () => {
    await stockEntryRepository.clear();
  });

  it("should get a stock of a product", async () => {
    await stockEntryRepository.save(new StockEntry(new Id("1"), "in", 10));
    await stockEntryRepository.save(new StockEntry(new Id("1"), "in", 5));
    await stockEntryRepository.save(new StockEntry(new Id("1"), "out", 2));
    await stockEntryRepository.save(new StockEntry(new Id("1"), "out", 3));
    const usecase = new GetStockUseCase(stockEntryRepository);
    const output = await usecase.execute({ productId: "1" });
    expect(output.total).toBe(10);
  });
});
