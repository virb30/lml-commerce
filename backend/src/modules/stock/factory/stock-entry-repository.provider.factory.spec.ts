import { MysqlConnectionAdapter } from "@modules/database/connection/mysql/mysql-connection.adapter";
import { StockEntryRepositoryDatabase } from "../repository/database/stock-entry.repository";
import { StockEntryRepositoryMemory } from "../repository/memory/stock-entry.repository";
import { StockEntryRepositoryProviderFactory } from "./stock-entry-repository.provider.factory";
import { dbConfig } from "@modules/database/connection/mysql/config";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

describe("StockEntryRepositoryProviderFactory tests", () => {
  const connection = new MysqlConnectionAdapter(dbConfig);
  const factory = new StockEntryRepositoryProviderFactory({ connection });

  afterAll(async () => {
    await connection.close();
  });

  it("creates memory repository", () => {
    const repository = factory.make("memory");
    expect(repository).toBeInstanceOf(StockEntryRepositoryMemory);
  });

  it("creates database repository", () => {
    const repository = factory.make("adapter");
    expect(repository).toBeInstanceOf(StockEntryRepositoryDatabase);
  });

  it("throws an error if datasource is invalid", () => {
    expect(() => {
      factory.make("invalid");
    }).toThrow(new Error("Invalid instance"));
  });
});
