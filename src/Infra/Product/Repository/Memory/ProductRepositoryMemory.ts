import { ProductRepository } from "../../../../Domain/Product/Repository/ProductRepository";
import { Product } from "../../../../Domain/Product/Entity/Product";
import { Id } from "../../../../Domain/@shared/ValueObject/Id";

export class ProductRepositoryMemory implements ProductRepository {
  private products: Product[] = [];

  public async getById(id: Id): Promise<Product> {
    const product = this.products.find((product) => {
      return product.id.value === id.value;
    });

    if (!product) {
      throw new Error("Product not found");
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
