import { MysqlConnectionAdapter } from "src/modules/database/connection/mysql/mysql-connection.adapter";
import { StockEntryRepositoryDatabase } from "../database/stock-entry.repository";
import { StockEntryRepositoryMemory } from "../memory/stock-entry.repository";
import { StockEntryRepositoryFactory } from "./stock-entry-repository.factory";
import { dbConfig } from "src/modules/database/connection/mysql/config";

describe("StockEntryRepositoryFactory tests", () => {
  it("creates memory repository", () => {
    const repository = StockEntryRepositoryFactory.make("memory");
    expect(repository).toBeInstanceOf(StockEntryRepositoryMemory);
  });

  it("creates database repository", () => {
    const connection = new MysqlConnectionAdapter(dbConfig);
    const repository = StockEntryRepositoryFactory.make("adapter", { connection });
    expect(repository).toBeInstanceOf(StockEntryRepositoryDatabase);
  });

  it("throws an error if datasource is invalid", () => {
    expect(() => {
      StockEntryRepositoryFactory.make("invalid");
    }).toThrow(new Error("Invalid data source"));
  });
});
