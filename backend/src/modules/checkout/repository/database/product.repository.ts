import { Product } from "../../domain/entity/product";
import { ProductRepository } from "../../domain/repository/product.repository.interface";
import { Dimensions } from "../../domain/value-object/dimensions";
import { Id } from "@modules/shared/domain/value-object/id";
import { Connection } from "../../../database/connection/connection.interface";
import { CurrencyFactory } from "@modules/shared/domain/value-object/currency/currency.factory";

export class ProductRepositoryDatabase implements ProductRepository {
  constructor(private connection: Connection) {}

  public async getById(id: Id): Promise<Product> {
    const [product] = await this.connection.query(
      "SELECT id, name, currency, price, height, width, length, weight FROM app.product WHERE id =?",
      [id.value],
    );

    if (!product) {
      throw new Error("Product not found");
    }

    const productItem = new Product(
      new Id(product.id),
      product.name,
      CurrencyFactory.make(parseFloat(product.price), product.currency),
      new Dimensions(product.height ?? 0, product.width ?? 0, product.length ?? 0),
      product.weight,
    );

    return productItem;
  }

  public async save(product: Product): Promise<void> {
    await this.connection.query(
      "INSERT INTO app.product (id,name,price,currency,height,width,length,weight) VALUES (?,?,?,?,?,?,?,?)",
      [
        product.id.value,
        product.name,
        product.price.value,
        product.price.code,
        product.dimensions?.height,
        product.dimensions?.width,
        product.dimensions?.length,
        product.weight,
      ],
    );
  }

  public async clear(): Promise<void> {
    await this.connection.query("DELETE FROM app.product", []);
  }
}
