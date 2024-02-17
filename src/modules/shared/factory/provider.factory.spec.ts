import { dbConfig } from "src/modules/database/connection/mysql/config";
import { MysqlConnectionAdapter } from "src/modules/database/connection/mysql/mysql-connection.adapter";
import { ProductRepositoryDatabase } from "src/modules/product-adm/repository/database/product.repository";
import { ProductRepositoryMemory } from "src/modules/product-adm/repository/memory/product.repository";
import { ProviderFactory } from "./provider.factory";
import { ProductRepository } from "src/modules/product-adm/domain/repository/product.repository.interface";

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
