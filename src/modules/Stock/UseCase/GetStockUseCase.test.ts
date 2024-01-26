import { GetStockUseCase } from "./GetStockUseCase";
import { StockEntry } from "../Domain/Entity/StockEntry";
import { Id } from "../../../Domain/@shared/ValueObject/Id";
import { MemoryRepositoryFactory } from "../../../Infra/@shared/Factory/MemoryRepositoryFactory";
import { StockEntryRepositoryMemory } from "../Repository/Memory/StockEntryRepositoryMemory";

describe("GetStockUseCase tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  const stockEntryRepository = repositoryFactory.makeStockEntryRepository();

  beforeEach(async () => {
    await stockEntryRepository.clear();
  });

  it("should get a stock of a product", async () => {
    await stockEntryRepository.save(new StockEntry(new Id("1"), "in", 10));
    await stockEntryRepository.save(new StockEntry(new Id("1"), "in", 5));
    await stockEntryRepository.save(new StockEntry(new Id("1"), "out", 2));
    await stockEntryRepository.save(new StockEntry(new Id("1"), "out", 3));
    const usecase = new GetStockUseCase(repositoryFactory);
    const output = await usecase.execute({ productId: "1" });
    expect(output.total).toBe(10);
  });
});
