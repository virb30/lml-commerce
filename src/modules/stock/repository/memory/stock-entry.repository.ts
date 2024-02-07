import { Injectable } from "@nestjs/common";
import { StockEntry } from "../../domain/entity/stock-entry.entity";
import { StockEntryRepository } from "../../domain/repository/stock-entry.repository.interface";
import { Id } from "src/modules/shared/domain/value-object/id";

@Injectable()
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
