import { ProductRepository } from "../../domain/repository/product.repository.interface";
import { Product } from "../../domain/entity/product";
import { Id } from "@modules/shared/domain/value-object/id";
import { NotFoundError } from "@modules/shared/errors/not-found.error";
export class ProductRepositoryMemory implements ProductRepository {
  private products: Product[] = [];

  public async getById(id: Id): Promise<Product> {
    const product = this.products.find((product) => {
      return product.id.value === id.value;
    });

    if (!product) {
      throw new NotFoundError("Product not found");
    }

    return product;
  }

  public async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  public async clear(): Promise<void> {
    this.products = [];
  }
}
