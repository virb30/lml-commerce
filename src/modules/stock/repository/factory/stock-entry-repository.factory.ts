import { Connection } from "src/modules/database/connection/connection.interface";
import { StockEntryRepositoryDatabase } from "../database/stock-entry.repository";
import { StockEntryRepositoryMemory } from "../memory/stock-entry.repository";

export class StockEntryRepositoryFactory {
  static make(dataSource: string, options?: StockEntryRepositoryFactoryOptions) {
    if (dataSource === "memory") {
      return new StockEntryRepositoryMemory();
    }

    if (dataSource === "adapter" && options?.connection) {
      return new StockEntryRepositoryDatabase(options.connection);
    }

    throw new Error("Invalid data source");
  }
}

export type StockEntryRepositoryFactoryOptions = {
  connection?: Connection;
};
