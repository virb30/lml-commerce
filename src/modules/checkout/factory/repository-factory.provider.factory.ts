import { ProviderFactory } from "src/modules/shared/factory/provider.factory";
import { RepositoryFactory } from "../domain/factory/repository-factory.interface";
import { Connection } from "src/modules/database/connection/connection.interface";
import { DatabaseRepositoryFactory } from "../repository/factory/database-repository.factory";
import { MemoryRepositoryFactory } from "../repository/factory/memory-repository.factory";

export class RepositoryFactoryProviderFactory extends ProviderFactory<RepositoryFactory> {
  constructor(options: RepositoryFactoryProviderFactoryOptions) {
    const mapper = {
      adapter: {
        className: DatabaseRepositoryFactory,
        options: {
          connection: options.connection,
        },
      },
      memory: {
        className: MemoryRepositoryFactory,
      },
    };
    super(mapper);
  }
}

type RepositoryFactoryProviderFactoryOptions = {
  connection: Connection;
};
