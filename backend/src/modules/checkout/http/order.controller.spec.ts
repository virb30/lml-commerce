import { Test, TestingModule } from "@nestjs/testing";
import { OrderController } from "./order.controller";
import { OrderRepository } from "../domain/repository/order.repository.interface";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Product } from "../domain/entity/product";
import { Dimensions } from "../domain/value-object/dimensions";
import { CheckoutModule } from "../checkout.module";
import { ConfigModule } from "@modules/config/config.module";
import { registerDataSource } from "../../../fixtures/data-source.fixture";
import { RepositoryFactory } from "../domain/factory/repository-factory.interface";
import { REPOSITORIES } from "../checkout.providers";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";

describe("OrderController tests", () => {
  let controller: OrderController;
  let repositoryFactory: RepositoryFactory;
  let productRepository: ProductRepository;
  let orderRepository: OrderRepository;
  const product1 = Product.create({
    name: "Fone de ouvido",
    price: new BRLCurrency(10.0),
    dimensions: new Dimensions(1, 2, 3),
    weight: 0.5,
  });
  const product2 = Product.create({
    name: "Bicicleta",
    price: new BRLCurrency(3800.0),
    dimensions: new Dimensions(2, 2, 5),
    weight: 5,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(registerDataSource("memory")), CheckoutModule],
    }).compile();

    repositoryFactory = module.get<RepositoryFactory>(REPOSITORIES.REPOSITORY_FACTORY.provide);
    controller = module.get<OrderController>(OrderController);

    productRepository = repositoryFactory.makeProductRepository();
    orderRepository = repositoryFactory.makeOrderRepository();
    await productRepository.clear();
    await orderRepository.clear();
  });

  afterEach(async () => {
    await productRepository.clear();
    await orderRepository.clear();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("places an order", async () => {
    await productRepository.save(product1);
    await productRepository.save(product2);
    const input = {
      email: "cliente@email.com",
      items: [
        { productId: product1.id.value, amount: 2 },
        { productId: product2.id.value, amount: 1 },
      ],
      date: "2023-01-01T10:00:00",
    };
    const output = await controller.create(input);
    expect(output.total).toBe(3880.0);
    expect(output.freight).toBe(60.0);
  });
});
