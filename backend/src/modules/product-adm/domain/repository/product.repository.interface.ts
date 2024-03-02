import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "../entity/product";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: Id): Promise<Product>;
  clear(): Promise<void>;
}
