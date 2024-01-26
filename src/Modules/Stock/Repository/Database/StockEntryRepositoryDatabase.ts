import { StockEntry } from "../../Domain/Entity/StockEntry";
import { StockEntryRepository } from "../../Domain/Repository/StockEntryRepository";
import { Id } from "../../../@shared/Domain/ValueObject/Id";
import { Connection } from "../../../../Infra/Database/Connection";

export class StockEntryRepositoryDatabase implements StockEntryRepository {
  public constructor(private connection: Connection) {}

  public async save(stockEntry: StockEntry): Promise<void> {
    await this.connection.query("INSERT INTO app.stock_entry (id_product, operation, quantity) VALUES (?,?,?);", [
      stockEntry.productId.value,
      stockEntry.operation,
      stockEntry.quantity,
    ]);
  }

  public async getByProductId(productId: Id): Promise<StockEntry[]> {
    const entriesData = await this.connection.query("SELECT * FROM app.stock_entry WHERE id_product = ?", [
      productId.value,
    ]);
    return entriesData.map((entry: any) => {
      return new StockEntry(new Id(entry.id_product), entry.operation, entry.quantity);
    });
  }

  public async clear(): Promise<void> {
    await this.connection.query("DELETE FROM app.stock_entry", []);
  }
}
