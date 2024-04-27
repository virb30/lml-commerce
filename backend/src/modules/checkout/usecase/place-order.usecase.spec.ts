import { PlaceOrderUseCase } from "./place-order.usecase";
import { Coupon } from "../domain/entity/coupon";
import { Product } from "../domain/entity/product";
import { CouponRepository } from "../domain/repository/coupon.repository.interface";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Dimensions } from "../domain/value-object/dimensions";
import { Id } from "@modules/shared/domain/value-object/id";
import { MemoryRepositoryFactory } from "../repository/factory/memory-repository.factory";
import { Queue } from "../../queue/queue.interface";
import { MemoryQueueAdapter } from "../../queue/adapter/memory/memory-queue.adapter";
import { OrderRepository } from "../domain/repository/order.repository.interface";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { NotFoundError } from "@modules/shared/errors/not-found.error";
import { CalculateFreightGateway } from "../gateway/calculate-freight.gateway.interface";
import { CalculateFreightMemoryGateway } from "../gateway/memory/calculate-freight-memory.gateway";

describe("Place order use case tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  let productRepository: ProductRepository;
  let couponRepository: CouponRepository;
  let orderRepository: OrderRepository;
  let queue: Queue;
  let calculateFreightGateway: CalculateFreightGateway;
  let useCase: PlaceOrderUseCase;
  const product1 = Product.create({
    name: "Fone de ouvido",
    price: new BRLCurrency(10.0),
    dimensions: new Dimensions(10, 20, 30),
    weight: 0,
  });
  const product2 = Product.create({
    name: "Bicicleta",
    price: new BRLCurrency(1500.0),
    dimensions: new Dimensions(10, 20, 30),
    weight: 0,
  });

  beforeEach(async () => {
    productRepository = repositoryFactory.makeProductRepository();
    couponRepository = repositoryFactory.makeCouponRepository();
    orderRepository = repositoryFactory.makeOrderRepository();
    queue = new MemoryQueueAdapter();
    calculateFreightGateway = new CalculateFreightMemoryGateway();
    useCase = new PlaceOrderUseCase(repositoryFactory, queue, calculateFreightGateway);
    await orderRepository.clear();
    await productRepository.clear();
    await couponRepository.clear();
    await productRepository.save(product1);
    await productRepository.save(product2);
  });

  it("places an order", async () => {
    const useCase = new PlaceOrderUseCase(repositoryFactory, queue, calculateFreightGateway);
    const input = {
      email: "cliente@email.com",
      items: [
        { id: product1.id.value, amount: 2 },
        { id: product2.id.value, amount: 2 },
      ],
      date: new Date("2024-01-01T10:00:00"),
    };
    const output = await useCase.execute(input);
    expect(output.id).toBeDefined();
    expect(output.code).toBe("202400000001");
    expect(output.total).toBe(3020);
    expect(output.freight).toBe(0);
  });

  it("throws an error if product not exists ", async () => {
    expect(async () => {
      const input = {
        email: "cliente@email.com",
        items: [{ id: "invalidId", amount: 1 }],
      };
      await useCase.execute(input);
    }).rejects.toThrowErrorTypeWithMessage(NotFoundError, "Product not found");
  });

  it("places an order with discount", async () => {
    const coupon = Coupon.create({
      code: "VALE10",
      percentage: 10,
      discountLimit: 10.0,
      expirationDate: new Date("2023-10-15T00:00:00"),
    });
    couponRepository.save(coupon);
    const input = {
      email: "cliente@email.com",
      items: [
        { id: product1.id.value, amount: 2 },
        { id: product2.id.value, amount: 2 },
      ],
      coupon: "VALE10",
      date: new Date("2023-10-10T23:59:59"),
    };
    const output = await useCase.execute(input);
    expect(output.id).toBeDefined();
    expect(output.code).toBe("202300000001");
    expect(output.total).toBe(3010);
    expect(output.freight).toBe(0);
  });

  it("throws an error when placing an order with an inexistent coupon", async () => {
    expect(async () => {
      const input = {
        email: "cliente@email.com",
        items: [
          { id: product1.id.value, amount: 2 },
          { id: product2.id.value, amount: 2 },
        ],
        coupon: "VALE10",
        date: new Date("2023-11-01T23:59:59"),
      };
      await useCase.execute(input);
    }).rejects.toThrowErrorTypeWithMessage(NotFoundError, "Coupon not found");
  });
});
