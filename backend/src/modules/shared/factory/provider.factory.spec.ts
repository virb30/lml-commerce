import { dbConfig } from "@modules/database/connection/mysql/config";
import { MysqlConnectionAdapter } from "@modules/database/connection/mysql/mysql-connection.adapter";
import { ProductRepositoryDatabase } from "@modules/product-adm/repository/database/product.repository";
import { ProductRepositoryMemory } from "@modules/product-adm/repository/memory/product.repository";
import { ProviderFactory } from "./provider.factory";
import { ProductRepository } from "@modules/product-adm/domain/repository/product.repository.interface";

describe("ProviderFactory tests", () => {
  it("constructs properly class", () => {
    const mapper = {
      memory: {
        className: ProductRepositoryMemory,
      },
      adapter: {
        className: ProductRepositoryDatabase,
        options: {
          connection: new MysqlConnectionAdapter(dbConfig),
        },
      },
    };

    const factory = new ProviderFactory<ProductRepository>(mapper);
    const repository = factory.make("memory");
    const repository2 = factory.make("adapter");
    expect(repository).toBeInstanceOf(ProductRepositoryMemory);
    expect(repository2).toBeInstanceOf(ProductRepositoryDatabase);
  });
});
