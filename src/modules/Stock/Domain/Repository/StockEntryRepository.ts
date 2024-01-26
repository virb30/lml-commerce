import { StockEntry } from "../Entity/StockEntry";
import { Id } from "../../../../Domain/@shared/ValueObject/Id";

export interface StockEntryRepository {
  save(stockEntry: StockEntry): Promise<void>;
  getByProductId(productId: Id): Promise<StockEntry[]>;
  clear(): Promise<void>;
}
