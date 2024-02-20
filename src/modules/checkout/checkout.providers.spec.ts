import { Test } from "@nestjs/testing";
import { ConfigModule } from "../config/config.module";
import { registerAs } from "@nestjs/config";
import { CheckoutModule } from "./checkout.module";
import { QueueModule } from "../queue/queue.module";
import { GetOrderUseCase } from "./usecase/get-order.usecase";
import { TOKENS } from "./constants";
import { MemoryRepositoryFactory } from "./repository/factory/memory-repository.factory";
import { DatabaseRepositoryFactory } from "./repository/factory/database-repository.factory";
import { ListOrdersUseCase } from "./usecase/list-orders.usecase";
import { PlaceOrderUseCase } from "./usecase/place-order.usecase";
import { SimulateFreightUseCase } from "./usecase/simulate-freight.usecase";
import { ValidateCouponUseCase } from "./usecase/validate-coupon.usecase";
import { MemoryOrdersQuery } from "./query/memory/memory-orders.query";
import { DatabaseOrdersQuery } from "./query/database/database-orders.query";

const registerDataSource = (source: string) => {
  return registerAs("data", () => ({ source }));
};

describe("CheckoutProviders tests", () => {
  describe("usecases tests", () => {
    it.each([
      { usecase: GetOrderUseCase },
      { usecase: ListOrdersUseCase },
      { usecase: PlaceOrderUseCase },
      { usecase: SimulateFreightUseCase },
      { usecase: ValidateCouponUseCase },
    ])("provides $usecase.name", async ({ usecase }) => {
      const module = await Test.createTestingModule({
        imports: [CheckoutModule],
      }).compile();
      const provider = module.get(usecase);

      expect(provider).toBeDefined();
      expect(provider).toBeInstanceOf(usecase);
    });
  });

  describe("repositorie factories tests", () => {
    it.each([
      { dataSource: "memory", instance: MemoryRepositoryFactory },
      { dataSource: "adapter", instance: DatabaseRepositoryFactory },
    ])("provides $instance.name", async ({ dataSource, instance }) => {
      const module = await Test.createTestingModule({
        imports: [ConfigModule.forFeature(registerDataSource(dataSource)), CheckoutModule],
      }).compile();
      const provider = module.get(TOKENS.REPOSITORY_FACTORY);

      expect(provider).toBeInstanceOf(instance);
    });
  });

  describe("queries tests", () => {
    it.each([
      { dataSource: "memory", instance: MemoryOrdersQuery },
      { dataSource: "adapter", instance: DatabaseOrdersQuery },
    ])("provides $instance.name", async ({ dataSource, instance }) => {
      const module = await Test.createTestingModule({
        imports: [ConfigModule.forFeature(registerDataSource(dataSource)), CheckoutModule],
      }).compile();
      const provider = module.get(TOKENS.ORDERS_QUERY);

      expect(provider).toBeInstanceOf(instance);
    });
  });
});
