import { Product } from "../../Domain/Entity/Product";
import { Dimensions } from "../../Domain/Entity/Dimensions";
import { Id } from "../../../@shared/Domain/ValueObject/Id";
import { MysqlConnectionAdapter } from "../../../../Infra/Database/MysqlConnectionAdapter";
import { ProductRepositoryDatabase } from "./ProductRepositoryDatabase";
import { db } from "../../../../Infra/Config";

describe("Product Repository", () => {
  const connection = new MysqlConnectionAdapter(db.getConnectionString());
  const productRepositoryDatabase = new ProductRepositoryDatabase(connection);

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await productRepositoryDatabase.clear();
  });
  it("Should create an product", async () => {
    const product = new Product(new Id("1"), "Notebook Avell", 5600.0, new Dimensions(10, 20, 30), 5);

    await productRepositoryDatabase.save(product);

    const dbProduct = await productRepositoryDatabase.getById(new Id("1"));
    expect(dbProduct).toStrictEqual(product);
  });

  it("Should throw an error if product not found", async () => {
    expect(async () => {
      await productRepositoryDatabase.getById(new Id("1"));
    }).rejects.toThrow(new Error("Product not found"));
  });
});
