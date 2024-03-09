import { Connection } from "@modules/database/connection/connection.interface";
import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "../../domain/entity/product";
import { ProductRepository } from "../../domain/repository/product.repository.interface";

export class ProductRepositoryDatabase implements ProductRepository {
  constructor(private readonly connection: Connection) {}

  async save(product: Product): Promise<void> {
    const productExists = await this.exists(product.id.value);
    if (!productExists) {
      await this.create(product);
    } else {
      await this.update(product);
    }
  }

  async findById(id: Id): Promise<Product> {
    const [productData] = await this.connection.query(
      "SELECT id, name, price, created_at, updated_at FROM app.product WHERE id = ?",
      [id.value],
    );
    if (!productData) {
      throw new Error("Product not found");
    }
    return new Product(
      new Id(productData.id),
      productData.name,
      parseFloat(productData.price),
      new Date(productData.created_at),
      new Date(productData.updated_at),
    );
  }

  async clear(): Promise<void> {
    await this.connection.query("TRUNCATE TABLE app.product", []);
  }

  private async exists(id: string): Promise<boolean> {
    const [product] = await this.connection.query("SELECT 1 AS `exists` FROM app.product WHERE id = ?", [id]);
    return product?.exists;
  }

  private async create(product: Product): Promise<void> {
    await this.connection.query(
      "INSERT INTO app.product (id, name, price, created_at, updated_at) VALUES (?,?,?,?,?);",
      [product.id.value, product.name, product.price, product.createdAt, product.updatedAt],
    );
  }

  private async update(product: Product): Promise<void> {
    await this.connection.query("UPDATE app.product SET name = ?, price = ?, updated_at = ? WHERE id = ?;", [
      product.name,
      product.price,
      product.updatedAt,
      product.id.value,
    ]);
  }
}
