import { Id } from "../../@shared/ValueObject/Id";
import { Product } from "../Entity/Product";

export interface ProductRepository {
  getById(id: Id): Promise<Product>;
  save(product: Product): Promise<void>;
  clear(): Promise<void>;
}
