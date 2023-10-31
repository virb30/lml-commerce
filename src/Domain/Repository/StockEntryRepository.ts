import { StockEntry } from "../Entity/StockEntry";
import { Id } from "../ValueObjects/Id";

export interface StockEntryRepository {
  save(stockEntry: StockEntry): Promise<void>;
  getByProductId(productId: Id): Promise<StockEntry[]>;
  clear(): Promise<void>;
}
