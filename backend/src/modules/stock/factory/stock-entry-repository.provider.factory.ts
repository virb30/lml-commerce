import { Connection } from "@modules/database/connection/connection.interface";
import { StockEntryRepositoryDatabase } from "../repository/database/stock-entry.repository";
import { StockEntryRepositoryMemory } from "../repository/memory/stock-entry.repository";
import { ConstructableObject, ProviderFactory } from "@modules/shared/factory/provider.factory";
import { StockEntryRepository } from "../domain/repository/stock-entry.repository.interface";

export class StockEntryRepositoryProviderFactory extends ProviderFactory<StockEntryRepository> {
  constructor(options: StockEntryRepositoryFactoryOptions) {
    const mapper: FactoryMap = {
      adapter: {
        className: StockEntryRepositoryDatabase,
        options: {
          connection: options.connection,
        },
      },
      memory: {
        className: StockEntryRepositoryMemory,
      },
    };
    super(mapper);
  }
}

export type StockEntryRepositoryFactoryOptions = {
  connection?: Connection;
};

type FactoryMap = {
  adapter: {
    className: ConstructableObject<StockEntryRepository>;
    options: {
      connection: Connection;
    };
  };
  memory: {
    className: ConstructableObject<StockEntryRepository>;
  };
};
