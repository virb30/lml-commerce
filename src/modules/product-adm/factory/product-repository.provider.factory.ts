import { Connection } from "src/modules/database/connection/connection.interface";
import { ProductRepositoryMemory } from "../repository/memory/product.repository";
import { ProductRepositoryDatabase } from "../repository/database/product.repository";
import { ConstructableObject, ProviderFactory } from "src/modules/shared/factory/provider.factory";
import { ProductRepository } from "../domain/repository/product.repository.interface";

export class ProductRepositoryProviderFactory extends ProviderFactory<ProductRepository> {
  constructor(options: ProductRepositoryFactoryOptions) {
    const mapper = {
      adapter: {
        className: ProductRepositoryDatabase,
        options: {
          connection: options.connection,
        },
      },
      memory: {
        className: ProductRepositoryMemory,
      },
    };
    super(mapper);
  }
}

export type ProductRepositoryFactoryOptions = {
  connection?: Connection;
};
