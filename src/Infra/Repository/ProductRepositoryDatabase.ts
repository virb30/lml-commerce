import { Product } from "../../Domain/Entity/Product";
import { ProductRepository } from "../../Domain/Repository/ProductRepository";
import { Dimensions } from "../../Domain/ValueObjects/Dimensions";
import { Id } from "../../Domain/ValueObjects/Id";
import { Connection } from "../Database/Connection";

export class ProductRepositoryDatabase implements ProductRepository {
  constructor(private connection: Connection) {}

  public async getById(id: Id): Promise<Product> {
    const [product] = await this.connection.query("SELECT * FROM app.product WHERE id =?", [id.value]);

    const productItem = new Product(
      new Id(product.id),
      product.name,
      parseFloat(product.price),
      new Dimensions(product.height, product.width, product.length),
      product.weight,
    );

    return productItem;
  }

  public async save(product: Product): Promise<void> {
    await this.connection.query(
      "INSERT INTO app.product (id,name,price,height,width,length,weight) VALUES (?,?,?,?,?,?,?)",
      [
        product.id.value,
        product.name,
        product.price,
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