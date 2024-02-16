import { Id } from "src/modules/shared/domain/value-object/id";
import { Product } from "../entity/product";

export interface ProductRepository {
  getById(id: Id): Promise<Product>;
  save(product: Product): Promise<void>;
  clear(): Promise<void>;
}
