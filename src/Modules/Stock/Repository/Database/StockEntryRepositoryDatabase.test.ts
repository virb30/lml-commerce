import { StockEntry } from "../../Domain/Entity/StockEntry";
import { Id } from "../../../@shared/Domain/ValueObject/Id";
import { MysqlConnectionAdapter } from "../../../../Infra/Database/MysqlConnectionAdapter";
import { getDbConnectionString } from "../../../../config";
import { StockEntryRepositoryDatabase } from "./StockEntryRepositoryDatabase";

describe("StockEntryRepositoryDatabase tests", () => {
  const connection = new MysqlConnectionAdapter(getDbConnectionString());
  const stockEntryRepository = new StockEntryRepositoryDatabase(connection);

  beforeEach(async () => {
    await stockEntryRepository.clear();
  });

  afterAll(async () => {
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
