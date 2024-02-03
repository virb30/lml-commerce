import { Id } from "../../../@shared/Domain/ValueObject/Id";
import { Product } from "../../Domain/Entity/Product";
import { ProductRepository } from "../../Domain/Repository/ProductRepository";

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
      throw new Error("Product not found");
    }
    return product;
  }

  async clear(): Promise<void> {
    this.products = [];
  }
}
