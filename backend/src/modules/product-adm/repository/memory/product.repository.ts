import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "../../domain/entity/product";
import { ProductRepository } from "../../domain/repository/product.repository.interface";
import { NotFoundError } from "@modules/shared/errors/not-found.error";

export class ProductRepositoryMemory implements ProductRepository {
  private products: Product[] = [];

  async save(product: Product): Promise<void> {
    const index = this.products.findIndex((storedProduct) => storedProduct.id.value === product.id.value);
    if (index !== -1) {
      this.products[index] = product;
    } else {
      this.products.push(product);
    }
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
