import { Provider } from "@nestjs/common";
import { CreateProductUseCase } from "./usecase/create-product.usecase";
import { ProductRepository } from "./domain/repository/product.repository.interface";
import { ProductRepositoryDatabase } from "./repository/database/product.repository";
import { ProductRepositoryMemory } from "./repository/memory/product.repository";
import { Connection } from "../database/connection/connection.interface";
import { QUEUE_PROVIDER_TOKEN } from "../queue/queue.providers";
import { Queue } from "../queue/queue.interface";
import { CONNECTION_PROVIDER_TOKEN } from "../database/database.providers";

export const REPOSITORIES = {
  PRODUCT_REPOSITORY: {
    provide: "ProductRepository",
    useExisting: ProductRepositoryDatabase,
  },
  PRODUCT_REPOSITORY_MEMORY: {
    provide: ProductRepositoryMemory,
    useClass: ProductRepositoryMemory,
  },
  PRODUCT_REPOSITORY_DATABASE: {
    provide: ProductRepositoryDatabase,
    useFactory: (connection: Connection) => {
      return new ProductRepositoryDatabase(connection);
    },
    inject: [CONNECTION_PROVIDER_TOKEN],
  },
};

export const USE_CASES = {
  CREATE_PRODUCT: {
    provide: CreateProductUseCase,
    useFactory: (productRepository: ProductRepository, queue: Queue) => {
      return new CreateProductUseCase(productRepository, queue);
    },
    inject: [REPOSITORIES.PRODUCT_REPOSITORY.provide, QUEUE_PROVIDER_TOKEN],
  },
};

export function provideProductAdmRepositories(): Provider[] {
  return Object.values(REPOSITORIES);
}

export function provideProductAdmUsecases(): Provider[] {
  return Object.values(USE_CASES);
}
