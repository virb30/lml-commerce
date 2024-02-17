import { Provider } from "@nestjs/common";
import { CreateProductUseCase } from "./usecase/create-product.usecase";
import { ProductRepository } from "./domain/repository/product.repository.interface";
import { Connection } from "../database/connection/connection.interface";
import { QUEUE_PROVIDER_TOKEN } from "../queue/queue.providers";
import { Queue } from "../queue/queue.interface";
import { CONNECTION_PROVIDER_TOKEN } from "../database/database.providers";
import { TOKENS } from "./constants";
import { ConfigService } from "@nestjs/config";
import { ProviderFactory } from "../shared/factory/provider.factory";
import { ProductRepositoryDatabase } from "./repository/database/product.repository";
import { ProductRepositoryMemory } from "./repository/memory/product.repository";
import { ProductRepositoryFactory } from "./repository/factory/product-repository.factory";

export const REPOSITORIES = {
  PRODUCT_REPOSITORY: {
    provide: TOKENS.PRODUCT_REPOSITORY,
    useFactory: (configService: ConfigService, connection: Connection) => {
      const dataSource = configService.get("data.source");
      const options = {
        connection,
      };
      const factory = new ProductRepositoryFactory(options);
      return factory.make(dataSource);
    },
    inject: [ConfigService, CONNECTION_PROVIDER_TOKEN],
  },
};

export const USE_CASES = {
  CREATE_PRODUCT: {
    provide: CreateProductUseCase,
    useFactory: (productRepository: ProductRepository, queue: Queue) => {
      return new CreateProductUseCase(productRepository, queue);
    },
    inject: [TOKENS.PRODUCT_REPOSITORY, QUEUE_PROVIDER_TOKEN],
  },
};

export function provideProductAdmRepositories(): Provider[] {
  return Object.values(REPOSITORIES);
}

export function provideProductAdmUsecases(): Provider[] {
  return Object.values(USE_CASES);
}
