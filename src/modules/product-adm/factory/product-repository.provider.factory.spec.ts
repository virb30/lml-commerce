import { MysqlConnectionAdapter } from "src/modules/database/connection/mysql/mysql-connection.adapter";
import { ProductRepositoryDatabase } from "../repository/database/product.repository";
import { ProductRepositoryMemory } from "../repository/memory/product.repository";
import { ProductRepositoryProviderFactory } from "./product-repository.provider.factory";
import { dbConfig } from "src/modules/database/connection/mysql/config";

describe("ProductRepositoryProviderFactory tests", () => {
  const options = {
    connection: new MysqlConnectionAdapter(dbConfig),
  };
  it("returns ProductRepositoryMemory instance", () => {
    const factory = new ProductRepositoryProviderFactory(options);
    const repository = factory.make("memory");
    expect(repository).toBeInstanceOf(ProductRepositoryMemory);
  });

  it("returns ProductRepositoryDatabase instance", () => {
    const factory = new ProductRepositoryProviderFactory(options);
    const repository = factory.make("adapter");
    expect(repository).toBeInstanceOf(ProductRepositoryDatabase);
  });

  it("throws an Error if invalid data source provided", () => {
    expect(() => {
      const factory = new ProductRepositoryProviderFactory(options);
      factory.make("invalid");
    }).toThrow(new Error("Invalid instance"));
  });
});
