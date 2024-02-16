import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { Id } from "src/modules/shared/domain/value-object/id";
import { Product } from "../../domain/entity/product";
import { ProductRepositoryDatabase } from "./product.repository";
import { dbConfig } from "src/modules/database/connection/mysql/config";

describe("Product repository database tests", () => {
  const connection = new MysqlConnectionAdapter(dbConfig);
  const productRepository = new ProductRepositoryDatabase(connection);

  beforeEach(async () => {
    await productRepository.clear();
  });

  afterAll(async () => {
    await productRepository.clear();
    await connection.close();
  });

  it("inserts a product in database", async () => {
    const id = new Id();
    const product = new Product(id, "Produto teste 1", 1000);
    await productRepository.save(product);

    const savedProduct = await productRepository.findById(id);
    expect(savedProduct.id.value).toBe(id.value);
    expect(savedProduct.name).toBe(product.name);
    expect(savedProduct.price).toBe(product.price);
  });
});
