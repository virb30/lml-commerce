import { StockEntry } from "../Entity/StockEntry";
import { Id } from "../../../@shared/Domain/ValueObject/Id";

export interface StockEntryRepository {
  save(stockEntry: StockEntry): Promise<void>;
  getByProductId(productId: Id): Promise<StockEntry[]>;
  clear(): Promise<void>;
}
