import { StockEntry } from "../entity/stock-entry.entity";
import { Id } from "@modules/shared/domain/value-object/id";

export interface StockEntryRepository {
  save(stockEntry: StockEntry): Promise<void>;
  getByProductId(productId: Id): Promise<StockEntry[]>;
  clear(): Promise<void>;
}

export const STOCK_REPOSITORY_TOKEN = "stock-repository-token";
