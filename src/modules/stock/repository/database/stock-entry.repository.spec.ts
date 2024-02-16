import { StockEntry } from "../../domain/entity/stock-entry.entity";
import { Id } from "src/modules/shared/domain/value-object/id";
import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { StockEntryRepositoryDatabase } from "./stock-entry.repository";
import { dbConfig } from "src/modules/database/connection/mysql/config";

describe("StockEntryRepositoryDatabase tests", () => {
  const connection = new MysqlConnectionAdapter(dbConfig);
  const stockEntryRepository = new StockEntryRepositoryDatabase(connection);

  beforeEach(async () => {
    await stockEntryRepository.clear();
  });

  afterAll(async () => {
    await stockEntryRepository.clear();
    await connection.close();
  });

  it("should create stock entries", async () => {
    await stockEntryRepository.save(new StockEntry(new Id("1"), "in", 3));
    await stockEntryRepository.save(new StockEntry(new Id("1"), "out", 1));
    await stockEntryRepository.save(new StockEntry(new Id("2"), "in", 3));

    const entries = await stockEntryRepository.getByProductId(new Id("1"));
    expect(entries).toHaveLength(2);
    expect(entries[0].operation).toBe("in");
    expect(entries[0].quantity).toBe(3);
    expect(entries[1].operation).toBe("out");
    expect(entries[1].quantity).toBe(1);
  });
});
