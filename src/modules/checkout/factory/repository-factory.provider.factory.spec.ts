import { dbConfig } from "src/modules/database/connection/mysql/config";
import { MysqlConnectionAdapter } from "src/modules/database/connection/mysql/mysql-connection.adapter";
import { MemoryRepositoryFactory } from "../repository/factory/memory-repository.factory";
import { RepositoryFactoryProviderFactory } from "./repository-factory.provider.factory";
import { DatabaseRepositoryFactory } from "../repository/factory/database-repository.factory";

describe("RepositoryFactoryProviderFactory tests", () => {
  const options = {
    connection: new MysqlConnectionAdapter(dbConfig),
  };

  it("returns MemoryRepositoryFactory instance", () => {
    const providerFactory = new RepositoryFactoryProviderFactory(options);
    const repositoryFactory = providerFactory.make("memory");
    expect(repositoryFactory).toBeInstanceOf(MemoryRepositoryFactory);
  });

  it("returns DatabaseRepositoryFactory instance", () => {
    const providerFactory = new RepositoryFactoryProviderFactory(options);
    const repositoryFactory = providerFactory.make("adapter");
    expect(repositoryFactory).toBeInstanceOf(DatabaseRepositoryFactory);
  });
});
