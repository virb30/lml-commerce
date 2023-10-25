import { Product } from "../src/Domain/Entity/Product";
import { Dimensions } from "../src/Domain/ValueObjects/Dimensions";
import { Id } from "../src/Domain/ValueObjects/Id";
import { MysqlConnectionAdapter } from "../src/Infra/Database/MysqlConnectionAdapter";
import { ProductRepositoryDatabase } from "../src/Infra/Repository/ProductRepositoryDatabase";
import { getDbConnectionString } from "../src/config";

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
});
