import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "../../domain/entity/product";
import { ProductRepositoryDatabase } from "./product.repository";
import { dbConfig } from "@modules/database/connection/mysql/config";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { CurrencyFactory } from "@modules/shared/domain/value-object/currency/currency.factory";

describe("Product repository database tests", () => {
  const connection = new MysqlConnectionAdapter(dbConfig);
  const productRepository = new ProductRepositoryDatabase(connection);

  beforeAll(() => {
    const factory = CurrencyFactory.getInstance();
    factory.register("brl", BRLCurrency);
  });

  beforeEach(async () => {
    await productRepository.clear();
  });

  afterAll(async () => {
    await productRepository.clear();
    await connection.close();
  });

  it("inserts a product in database", async () => {
    const id = new Id();
    const product = new Product(id, "Produto teste 1", new BRLCurrency(10));
    await productRepository.save(product);

    const savedProduct = await productRepository.findById(id);
    expect(savedProduct.id.value).toBe(id.value);
    expect(savedProduct.name).toBe(product.name);
    expect(savedProduct.price.value).toBe(product.price.value);
    expect(savedProduct.price.code).toBe(product.price.code);
  });
});
