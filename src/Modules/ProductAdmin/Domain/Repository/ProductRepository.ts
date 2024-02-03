import { Id } from "../../../@shared/Domain/ValueObject/Id";
import { Product } from "../Entity/Product";

export interface ProductRepository {
  save(product: Product): Promise<void>;
  findById(id: Id): Promise<Product>;
  clear(): Promise<void>;
}
