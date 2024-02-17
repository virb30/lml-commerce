import { GetStockUseCase } from "./usecase/get-stock.usecase";
import { Connection } from "../database/connection/connection.interface";
import { Provider } from "@nestjs/common";
import { CONNECTION_PROVIDER_TOKEN } from "../database/database.providers";
import { ConfigService } from "@nestjs/config";
import { StockEntryRepositoryFactory } from "./repository/factory/stock-entry-repository.factory";
import { TOKENS } from "./constants";
import { StockEntryRepository } from "./domain/repository/stock-entry.repository.interface";

export const REPOSITORIES = {
  STOCK_ENTRY_REPOSITORY: {
    provide: TOKENS.STOCK_ENTRY_REPOSITORY,
    useFactory: (configService: ConfigService, connection: Connection) => {
      const options = {
        connection,
      };
      const dataSource = configService.get("data.source");
      return StockEntryRepositoryFactory.make(dataSource, options);
    },
    inject: [ConfigService, CONNECTION_PROVIDER_TOKEN],
  },
};

export const USE_CASES = {
  GET_STOCK_USECASE: {
    provide: GetStockUseCase,
    useFactory: (stockEntryRepository: StockEntryRepository) => {
      return new GetStockUseCase(stockEntryRepository);
    },
    inject: [TOKENS.STOCK_ENTRY_REPOSITORY],
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
