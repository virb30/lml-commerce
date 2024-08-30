import { Product } from "../../domain/entity/product";
import { Dimensions } from "../../domain/value-object/dimensions";
import { Id } from "@modules/shared/domain/value-object/id";
import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { ProductRepositoryDatabase } from "./product.repository";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { CurrencyFactory } from "@modules/shared/domain/value-object/currency/currency.factory";
import { NotFoundError } from "@modules/shared/errors/not-found.error";
import { initDb } from "@test/initDb";

describe("Product Repository", () => {
  const db = initDb(MysqlConnectionAdapter);
  let productRepositoryDatabase: ProductRepositoryDatabase;

  beforeAll(() => {
    productRepositoryDatabase = new ProductRepositoryDatabase(db.connection);
    const factory = CurrencyFactory.getInstance();
    factory.register("brl", BRLCurrency);
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
    await expect(productRepositoryDatabase.getById(new Id("1"))).rejects.toThrowErrorTypeWithMessage(
      NotFoundError,
      "Product not found",
    );
  });
});
