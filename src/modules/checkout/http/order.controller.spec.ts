import { Test, TestingModule } from "@nestjs/testing";
import { OrderController } from "./order.controller";
import { OrderRepository } from "../domain/repository/order.repository.interface";
import { MemoryRepositoryFactory } from "src/modules/shared/factory/memory.repository.factory";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Product } from "../domain/entity/product";
import { Id } from "src/modules/shared/domain/value-object/id";
import { Dimensions } from "../domain/value-object/dimensions";
import { PlaceOrderUseCase } from "../usecase/place-order.usecase";
import { MemoryQueueAdapter } from "src/modules/queue/adapter/memory/memory-queue.adapter";
import { CheckoutModule } from "../checkout.module";

describe("OrderController", () => {
  let controller: OrderController;

  const repositoryFactory = new MemoryRepositoryFactory();
  let productRepository: ProductRepository;
  let orderRepository: OrderRepository;

  beforeEach(async () => {
    productRepository = repositoryFactory.makeProductRepository();
    orderRepository = repositoryFactory.makeOrderRepository();
    await productRepository.clear();
    await orderRepository.clear();
  });

  beforeEach(async () => {
    const placeOrderUseCase = new PlaceOrderUseCase(repositoryFactory, new MemoryQueueAdapter());
    const module: TestingModule = await Test.createTestingModule({
      imports: [CheckoutModule],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it.skip("should be defined", async () => {
    await productRepository.save(new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(1, 2, 3), 0.5));
    await productRepository.save(new Product(new Id("2"), "Placa de vídeo", 3800.0, new Dimensions(2, 2, 5), 5));

    const input = {
      email: "cliente@email.com",
      items: [
        { product_id: "1", amount: 2 },
        { product_id: "2", amount: 1 },
      ],
      date: "2023-01-01T10:00:00",
    };

    const output = await controller.create(input);

    expect(output.total).toBe(3880.0);
    expect(controller).toBeDefined();
  });
});
