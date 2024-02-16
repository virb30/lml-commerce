import { GetStockUseCase } from "./usecase/get-stock.usecase";
import { StockEntryRepository } from "./domain/repository/stock-entry.repository.interface";
import { StockEntryRepositoryMemory } from "./repository/memory/stock-entry.repository";
import { StockEntryRepositoryDatabase } from "./repository/database/stock-entry.repository";
import { Connection } from "../database/connection/connection.interface";
import { Provider } from "@nestjs/common";
import { CONNECTION_PROVIDER_TOKEN } from "../database/database.providers";
import { QUEUE_PROVIDER_TOKEN } from "../queue/queue.providers";

export const REPOSITORIES = {
  STOCK_ENTRY_REPOSITORY: {
    provide: "StockEntryRepository",
    useExisting: StockEntryRepositoryDatabase,
  },
  STOCK_ENTRY_MEMORY_REPOSITORY: {
    provide: StockEntryRepositoryMemory,
    useClass: StockEntryRepositoryMemory,
  },
  STOCK_ENTRY_DATABASE_REPOSITORY: {
    provide: StockEntryRepositoryDatabase,
    useFactory: (databaseProvider: Connection): StockEntryRepository => {
      return new StockEntryRepositoryDatabase(databaseProvider);
    },
    inject: [CONNECTION_PROVIDER_TOKEN],
  },
};

export const USE_CASES = {
  GET_STOCK_USECASE: {
    provide: GetStockUseCase,
    useFactory: (stockEntryRepository: StockEntryRepository) => {
      return new GetStockUseCase(stockEntryRepository);
    },
    inject: [REPOSITORIES.STOCK_ENTRY_REPOSITORY.provide],
  },
};

export function provideStockUsecases(): Provider[] {
  return Object.values(USE_CASES);
}

export function provideStockRepositories(): Provider[] {
  return Object.values(REPOSITORIES);
}

export const STOCK_PROVIDERS = {
  REPOSITORIES,
  USE_CASES,
};
