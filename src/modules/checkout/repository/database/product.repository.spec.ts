import { Product } from "../../domain/entity/product";
import { Dimensions } from "../../domain/value-object/dimensions";
import { Id } from "src/modules/shared/domain/value-object/id";
import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { ProductRepositoryDatabase } from "./product.repository";
import { dbConfig } from "src/modules/database/connection/mysql/config";

describe("Product Repository", () => {
  const connection = new MysqlConnectionAdapter(dbConfig);
  const productRepositoryDatabase = new ProductRepositoryDatabase(connection);

  afterAll(async () => {
    await productRepositoryDatabase.clear();
    await connection.close();
  });

  beforeEach(async () => {
    await productRepositoryDatabase.clear();
  });
  it("creates a product", async () => {
    const product = new Product(new Id("1"), "Notebook Avell", 5600.0, new Dimensions(10, 20, 30), 5);

    await productRepositoryDatabase.save(product);

    const dbProduct = await productRepositoryDatabase.getById(new Id("1"));
    expect(dbProduct).toStrictEqual(product);
  });

  it("throws an error if product not found", async () => {
    expect(async () => {
      await productRepositoryDatabase.getById(new Id("1"));
    }).rejects.toThrow(new Error("Product not found"));
  });
});
