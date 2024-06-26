import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "../../domain/entity/product.entity";
import { ProductRepository } from "../../domain/repository/product.repository.interface";
import { NotFoundError } from "../../../shared/errors/not-found.error";

export class ProductRepositoryMemory implements ProductRepository {
  private products: Product[] = [];

  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  async findById(id: Id): Promise<Product> {
    const product = this.products.find((product) => {
      return product.id.value === id.value;
    });
    if (!product) {
      throw new NotFoundError("Product not found");
    }
    return product;
  }

  async clear(): Promise<void> {
    this.products = [];
  }
}
