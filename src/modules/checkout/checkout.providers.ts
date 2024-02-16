import { Provider } from "@nestjs/common";
import { GetOrderUseCase } from "./usecase/get-order.usecase";
import { OrderRepository } from "./domain/repository/order.repository.interface";
import { OrderRepositoryDatabase } from "./repository/database/order.repository";
import { Connection } from "../database/connection/connection.interface";
import { OrderRepositoryMemory } from "./repository/memory/order.repository";
import { PlaceOrderUseCase } from "./usecase/place-order.usecase";
import { RepositoryFactory } from "../shared/domain/factory/repository-factory.interface";
import { DatabaseRepositoryFactory } from "../shared/factory/database.repository.factory";
import { MemoryRepositoryFactory } from "../shared/factory/memory.repository.factory";
import { SimulateFreightUseCase } from "./usecase/simulate-freight.usecase";
import { CouponRepositoryDatabase } from "./repository/database/coupon.repository";
import { CouponRepositoryMemory } from "./repository/memory/coupon.repository";
import { ValidateCouponUseCase } from "./usecase/validate-coupon.usecase";
import { CouponRepository } from "./domain/repository/coupon.repository.interface";
import { Queue } from "../queue/queue.interface";
import { QUEUE_PROVIDER_TOKEN } from "../queue/queue.providers";
import { CONNECTION_PROVIDER_TOKEN } from "../database/database.providers";
import { DatabaseOrdersQuery } from "./query/database-orders.query";
import { MemoryOrdersQuery } from "./query/memory-orders.query";

export const REPOSITORIES = {
  ORDER_REPOSITORY: {
    provide: "OrderRepository",
    useExisting: OrderRepositoryDatabase,
  },
  ORDER_REPOSITORY_DATABASE: {
    provide: OrderRepositoryDatabase,
    useFactory: (connection: Connection) => {
      return new OrderRepositoryDatabase(connection);
    },
    inject: [CONNECTION_PROVIDER_TOKEN],
  },
  ORDER_REPOSITORY_MEMORY: {
    provide: OrderRepositoryMemory,
    useClass: OrderRepositoryMemory,
  },
  REPOSITORY_FACTORY: {
    provide: "REPOSITORY_FACTORY",
    useExisting: DatabaseRepositoryFactory,
  },
  DATABASE_REPOSITORY_FACTORY: {
    provide: DatabaseRepositoryFactory,
    useFactory: (connection: Connection) => {
      return new DatabaseRepositoryFactory(connection);
    },
    inject: [CONNECTION_PROVIDER_TOKEN],
  },
  MEMORY_REPOSITORY_FACTORY: {
    provide: MemoryRepositoryFactory,
    useClass: MemoryRepositoryFactory,
  },
  COUPON_REPOSITORY: {
    provide: "CouponRepository",
    useExisting: CouponRepositoryDatabase,
  },
  COUPON_REPOSITORY_MEMORY: {
    provide: CouponRepositoryMemory,
    useClass: CouponRepositoryMemory,
  },
  COUPON_REPOSITORY_DATABASE: {
    provide: CouponRepositoryDatabase,
    useFactory: (connection: Connection) => {
      return new CouponRepositoryDatabase(connection);
    },
    inject: [CONNECTION_PROVIDER_TOKEN],
  },
};

export const QUERY = {
  ORDERS_QUERY: {
    provide: "OrdersQuery",
    useExisting: DatabaseOrdersQuery,
  },
  ORDERS_QUERY_MEMORY: {
    provide: MemoryOrdersQuery,
    useClass: MemoryOrdersQuery,
  },
  ORDERS_QUERY_DATABASE: {
    provide: DatabaseOrdersQuery,
    useFactory: (connection: Connection) => {
      return new DatabaseOrdersQuery(connection);
    },
    inject: [CONNECTION_PROVIDER_TOKEN],
  },
};

export const USE_CASES = {
  GET_ORDERS: {
    provide: GetOrderUseCase,
    useFactory: (orderRepository: OrderRepository) => {
      return new GetOrderUseCase(orderRepository);
    },
    inject: [QUERY.ORDERS_QUERY.provide],
  },
  PLACE_ORDER: {
    provide: PlaceOrderUseCase,
    useFactory: (repositoryFactory: RepositoryFactory, queue: Queue) => {
      return new PlaceOrderUseCase(repositoryFactory, queue);
    },
    inject: [REPOSITORIES.REPOSITORY_FACTORY.provide, QUEUE_PROVIDER_TOKEN],
  },
  SIMULATE_FREIGHT: {
    provide: SimulateFreightUseCase,
    useFactory: (repositoryFactory: RepositoryFactory) => {
      return new SimulateFreightUseCase(repositoryFactory);
    },
    inject: [REPOSITORIES.REPOSITORY_FACTORY.provide],
  },
  VALIDATE_COUPON: {
    provide: ValidateCouponUseCase,
    useFactory: (couponRepository: CouponRepository) => {
      return new ValidateCouponUseCase(couponRepository);
    },
    inject: [REPOSITORIES.COUPON_REPOSITORY.provide],
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
