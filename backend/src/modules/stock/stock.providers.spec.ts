import { Test } from "@nestjs/testing";
import { GetStockUseCase } from "./usecase/get-stock.usecase";
import { StockModule } from "./stock.module";
import { StockEntryRepositoryMemory } from "./repository/memory/stock-entry.repository";
import { ConfigModule } from "../config/config.module";
import { StockEntryRepositoryDatabase } from "./repository/database/stock-entry.repository";
import { TOKENS } from "./constants";
import { registerDataSource } from "../../fixtures/data-source.fixture";

describe("StockProvider tests", () => {
  describe("usecases tests", () => {
    it("provides GetStockUseCase", async () => {
      const module = await Test.createTestingModule({
        imports: [StockModule],
      }).compile();
      const provider = module.get(GetStockUseCase);

      expect(provider).toBeDefined();
      expect(provider).toBeInstanceOf(GetStockUseCase);
    });
  });

  describe("repositories tests", () => {
    it.each([
      { dataSource: "memory", instance: StockEntryRepositoryMemory },
      { dataSource: "adapter", instance: StockEntryRepositoryDatabase },
    ])("provides $instance.name", async ({ dataSource, instance }) => {
      const module = await Test.createTestingModule({
        imports: [ConfigModule.forFeature(registerDataSource(dataSource)), StockModule],
      }).compile();
      const provider = module.get(TOKENS.STOCK_ENTRY_REPOSITORY);

      expect(provider).toBeInstanceOf(instance);
    });
  });
});
