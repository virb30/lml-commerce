import { Product } from "../../Domain/Entity/Product";
import { Dimensions } from "../../Domain/Entity/Dimensions";
import { Id } from "../../../../Domain/@shared/ValueObject/Id";
import { MysqlConnectionAdapter } from "../../../../Infra/@shared/Database/MysqlConnectionAdapter";
import { ProductRepositoryDatabase } from "./ProductRepositoryDatabase";
import { getDbConnectionString } from "../../../../config";

describe("Product Repository", () => {
  const connection = new MysqlConnectionAdapter(getDbConnectionString());
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
