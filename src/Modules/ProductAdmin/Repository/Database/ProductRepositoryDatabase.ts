import { Connection } from "../../../../Infra/Database/Connection";
import { Id } from "../../../@shared/Domain/ValueObject/Id";
import { Product } from "../../Domain/Entity/Product";
import { ProductRepository } from "../../Domain/Repository/ProductRepository";

export class ProductRepositoryDatabase implements ProductRepository {
  constructor(private connection: Connection) {}

  async save(product: Product): Promise<void> {
    await this.connection.query(
      "INSERT INTO app.product (id, name, price, created_at, updated_at) VALUES (?,?,?,?,?);",
      [product.id.value, product.name, product.price, product.createdAt, product.createdAt],
    );
  }

  async findById(id: Id): Promise<Product> {
    const [productData] = await this.connection.query(
      "SELECT id, name, price, created_at FROM app.product WHERE id = ?",
      [id.value],
    );
    if (!productData) {
      throw new Error("Product not found");
    }
    return new Product(new Id(productData.id), productData.name, productData.price, new Date(productData.created_at));
  }

  async clear(): Promise<void> {
    await this.connection.query("TRUNCATE TABLE app.product", []);
  }
}
