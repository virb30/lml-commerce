import { Product } from "../../domain/entity/product";
import { ProductRepository } from "../../domain/repository/product.repository.interface";
import { Dimensions } from "../../domain/value-object/dimensions";
import { Id } from "@modules/shared/domain/value-object/id";
import { Connection } from "../../../database/connection/connection.interface";
import { CurrencyFactory } from "@modules/shared/domain/value-object/currency/currency.factory";
import { NotFoundError } from "@modules/shared/errors/not-found.error";

export class ProductRepositoryDatabase implements ProductRepository {
  constructor(private connection: Connection) {}

  public async getById(id: Id): Promise<Product> {
    const [productData] = await this.connection.query(
      "SELECT id, name, currency, price, height, width, length, weight FROM app.product WHERE id =?",
      [id.value],
    );
    if (!productData) {
      throw new NotFoundError("Product not found");
    }
    return Product.restore({
      id: new Id(productData.id),
      name: productData.name,
      price: CurrencyFactory.make(parseFloat(productData.price), productData.currency),
      dimensions: new Dimensions(productData.height ?? 0, productData.width ?? 0, productData.length ?? 0),
      weight: productData.weight,
    });
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
