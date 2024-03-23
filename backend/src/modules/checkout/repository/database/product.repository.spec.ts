import { Product } from "../../domain/entity/product";
import { Dimensions } from "../../domain/value-object/dimensions";
import { Id } from "@modules/shared/domain/value-object/id";
import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { ProductRepositoryDatabase } from "./product.repository";
import { dbConfig } from "@modules/database/connection/mysql/config";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { CurrencyFactory } from "@modules/shared/domain/value-object/currency/currency.factory";

describe("Product Repository", () => {
  const connection = new MysqlConnectionAdapter(dbConfig);
  const productRepositoryDatabase = new ProductRepositoryDatabase(connection);

  beforeAll(() => {
    const factory = CurrencyFactory.getInstance();
    factory.register("brl", BRLCurrency);
  });

  afterAll(async () => {
    await productRepositoryDatabase.clear();
    await connection.close();
  });

  beforeEach(async () => {
    await productRepositoryDatabase.clear();
  });
  it("creates a product", async () => {
    const product = new Product(new Id("1"), "Notebook Avell", new BRLCurrency(5600.0), new Dimensions(10, 20, 30), 5);

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
