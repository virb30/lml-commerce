import { StockEntry } from "../../domain/entity/stock-entry.entity";
import { Id } from "@modules/shared/domain/value-object/id";
import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { StockEntryRepositoryDatabase } from "./stock-entry.repository";
import { initDb } from "@test/initDb";

describe("StockEntryRepositoryDatabase tests", () => {
  const db = initDb(MysqlConnectionAdapter);
  let stockEntryRepository: StockEntryRepositoryDatabase;

  beforeAll(() => {
    stockEntryRepository = new StockEntryRepositoryDatabase(db.connection);
  });

  beforeEach(async () => {
    await stockEntryRepository.clear();
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
