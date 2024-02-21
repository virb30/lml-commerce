import { Id } from "src/modules/shared/domain/value-object/id";
import { Product } from "../entity/product.entity";

export interface ProductRepository {
  findById(id: Id): Promise<Product>;
}
