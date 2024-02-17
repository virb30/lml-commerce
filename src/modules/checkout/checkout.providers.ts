import { Provider } from "@nestjs/common";
import { GetOrderUseCase } from "./usecase/get-order.usecase";
import { Connection } from "../database/connection/connection.interface";
import { PlaceOrderUseCase } from "./usecase/place-order.usecase";
import { RepositoryFactory } from "./domain/factory/repository-factory.interface";
import { SimulateFreightUseCase } from "./usecase/simulate-freight.usecase";
import { ValidateCouponUseCase } from "./usecase/validate-coupon.usecase";
import { Queue } from "../queue/queue.interface";
import { QUEUE_PROVIDER_TOKEN } from "../queue/queue.providers";
import { CONNECTION_PROVIDER_TOKEN } from "../database/database.providers";
import { DatabaseOrdersQuery } from "./query/database/database-orders.query";
import { MemoryOrdersQuery } from "./query/memory/memory-orders.query";
import { ListOrdersUseCase } from "./usecase/list-orders.usecase";
import { OrdersQuery } from "./query/orders.query.interface";
import { ConfigService } from "@nestjs/config";
import { RepositoryFactoryProviderFactory } from "./factory/repository-factory.provider.factory";
import { TOKENS } from "./constants";
import { OrdersQueryProviderFactory } from "./factory/orders-query.provider.factory";
import dataSource from "../config/data.source";

export const REPOSITORIES = {
  REPOSITORY_FACTORY: {
    provide: TOKENS.REPOSITORY_FACTORY,
    useFactory: (configService: ConfigService, connection: Connection) => {
      const options = {
        connection,
      };
      const dataSource = configService.get("data.source");
      const providerFactory = new RepositoryFactoryProviderFactory(options);
      return providerFactory.make(dataSource);
    },
    inject: [ConfigService, CONNECTION_PROVIDER_TOKEN],
  },
};

export const QUERY = {
  ORDERS_QUERY: {
    provide: "OrdersQuery",
    useFactory: (configService: ConfigService, connection: Connection) => {
      const options = {
        connection,
      };
      const dataSource = configService.get("data.source");
      const factory = new OrdersQueryProviderFactory(options);
      return factory.make(dataSource);
    },
    inject: [ConfigService, CONNECTION_PROVIDER_TOKEN],
  },
};

export const USE_CASES = {
  GET_ORDER: {
    provide: GetOrderUseCase,
    useFactory: (repositoryFactory: RepositoryFactory) => {
      return new GetOrderUseCase(repositoryFactory);
    },
    inject: [TOKENS.REPOSITORY_FACTORY],
  },
  LIST_ORDERS: {
    provide: ListOrdersUseCase,
    useFactory: (ordersQuery: OrdersQuery) => {
      return new ListOrdersUseCase(ordersQuery);
    },
    inject: [QUERY.ORDERS_QUERY.provide],
  },
  PLACE_ORDER: {
    provide: PlaceOrderUseCase,
    useFactory: (repositoryFactory: RepositoryFactory, queue: Queue) => {
      return new PlaceOrderUseCase(repositoryFactory, queue);
    },
    inject: [TOKENS.REPOSITORY_FACTORY, QUEUE_PROVIDER_TOKEN],
  },
  SIMULATE_FREIGHT: {
    provide: SimulateFreightUseCase,
    useFactory: (repositoryFactory: RepositoryFactory) => {
      return new SimulateFreightUseCase(repositoryFactory);
    },
    inject: [TOKENS.REPOSITORY_FACTORY],
  },
  VALIDATE_COUPON: {
    provide: ValidateCouponUseCase,
    useFactory: (repositoryFactory: RepositoryFactory) => {
      return new ValidateCouponUseCase(repositoryFactory);
    },
    inject: [TOKENS.REPOSITORY_FACTORY],
  },
};

export function provideCheckoutUsecases(): Provider[] {
  return Object.values(USE_CASES);
}

export function provideCheckoutRepositories(): Provider[] {
  return Object.values(REPOSITORIES);
}

export function provideCheckoutQueries(): Provider[] {
  return Object.values(QUERY);
}
