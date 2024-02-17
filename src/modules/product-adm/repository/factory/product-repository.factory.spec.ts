import { MysqlConnectionAdapter } from "src/modules/database/connection/mysql/mysql-connection.adapter";
import { ProductRepositoryDatabase } from "../database/product.repository";
import { ProductRepositoryMemory } from "../memory/product.repository";
import { ProductRepositoryFactory } from "./product-repository.factory";
import { dbConfig } from "src/modules/database/connection/mysql/config";

describe("ProductRepositoryFactory tests", () => {
  const options = {
    connection: new MysqlConnectionAdapter(dbConfig),
  };
  it("returns ProductRepositoryMemory instance", () => {
    const factory = new ProductRepositoryFactory(options);
    const repository = factory.make("memory");
    expect(repository).toBeInstanceOf(ProductRepositoryMemory);
  });

  it("returns ProductRepositoryDatabase instance", () => {
    const factory = new ProductRepositoryFactory(options);
    const repository = factory.make("adapter");
    expect(repository).toBeInstanceOf(ProductRepositoryDatabase);
  });

  it("throws an Error if invalid data source provided", () => {
    expect(() => {
      const factory = new ProductRepositoryFactory(options);
      factory.make("invalid");
    }).toThrow(new Error("Invalid instance"));
  });
});
