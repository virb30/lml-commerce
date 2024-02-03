import { db } from "../../../../Infra/Config";
import { Connection } from "../../../../Infra/Database/Connection";
import { MysqlConnectionAdapter } from "../../../../Infra/Database/MysqlConnectionAdapter";
import { Id } from "../../../@shared/Domain/ValueObject/Id";
import { Product } from "../../Domain/Entity/Product";
import { ProductRepositoryDatabase } from "./ProductRepositoryDatabase";

describe("Product repository database tests", () => {
  const connection = new MysqlConnectionAdapter(db.getConnectionString());
  const productRepository = new ProductRepositoryDatabase(connection);

  beforeEach(async () => {
    await productRepository.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Should insert a product in database", async () => {
    const id = new Id();
    const product = new Product(id, "Produto teste 1", 1000);
    await productRepository.save(product);

    const savedProduct = await productRepository.findById(id);
    expect(savedProduct.id.value).toBe(id.value);
    expect(savedProduct.name).toBe(product.name);
    expect(savedProduct.price).toBe(product.price);
  });
});
