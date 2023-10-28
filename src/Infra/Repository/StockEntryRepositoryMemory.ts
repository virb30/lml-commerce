import { StockEntry } from "../../Domain/Entity/StockEntry";
import { StockEntryRepository } from "../../Domain/Repository/StockEntryRepository";
import { Id } from "../../Domain/ValueObjects/Id";

export class StockEntryRepositoryMemory implements StockEntryRepository {
  public stockEntries: StockEntry[] = [];

  public async save(stockEntry: StockEntry): Promise<void> {
    this.stockEntries.push(stockEntry);
  }

  public async getByProductId(productId: Id): Promise<StockEntry[]> {
    return this.stockEntries.filter((stockEntry) => stockEntry.productId.value === productId.value);
  }

  public async clear(): Promise<void> {
    this.stockEntries = [];
  }
}
