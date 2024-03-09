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

describe("Place order use case tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  let productRepository: ProductRepository;
  let couponRepository: CouponRepository;
  let queue: Queue;

  beforeEach(async () => {
    productRepository = repositoryFactory.makeProductRepository();
    couponRepository = repositoryFactory.makeCouponRepository();
    queue = new MemoryQueueAdapter();
    await productRepository.clear();
    await couponRepository.clear();
  });

  it("should place an order", async () => {
    productRepository.save(new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0));
    productRepository.save(new Product(new Id("2"), "Bicicleta", 1500.0, new Dimensions(10, 20, 30), 0));

    const useCase = new PlaceOrderUseCase(repositoryFactory, queue);
    const input = {
      email: "cliente@email.com",
      items: [
        { id: "1", amount: 2 },
        { id: "2", amount: 2 },
      ],
    };
    const output = await useCase.execute(input);

    expect(output).toStrictEqual({
      total: 3020,
      freight: 0,
    });
  });

  it("should throw exception if product not exists ", async () => {
    expect(async () => {
      const useCase = new PlaceOrderUseCase(repositoryFactory, queue);
      const input = {
        email: "cliente@email.com",
        items: [{ id: "1", amount: 1 }],
      };
      await useCase.execute(input);
    }).rejects.toThrow(new Error("Product not found"));
  });

  it("should place an order with discount", async () => {
    couponRepository.save(new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-10-15T00:00:00")));
    productRepository.save(new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0));
    productRepository.save(new Product(new Id("2"), "Bicicleta", 1500.0, new Dimensions(10, 20, 30), 0));
    const useCase = new PlaceOrderUseCase(repositoryFactory, queue);
    const input = {
      email: "cliente@email.com",
      items: [
        { id: "1", amount: 2 },
        { id: "2", amount: 2 },
      ],
      coupon: "VALE10",
      date: new Date("2023-10-10T23:59:59"),
    };
    const output = await useCase.execute(input);

    expect(output).toStrictEqual({
      total: 3010,
      freight: 0,
    });
  });

  it("throws an error when placing an order with an inexistent coupon", async () => {
    expect(async () => {
      productRepository.save(new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0));
      productRepository.save(new Product(new Id("2"), "Bicicleta", 1500.0, new Dimensions(10, 20, 30), 0));
      const useCase = new PlaceOrderUseCase(repositoryFactory, queue);
      const input = {
        email: "cliente@email.com",
        items: [
          { id: "1", amount: 2 },
          { id: "2", amount: 2 },
        ],
        coupon: "VALE10",
        date: new Date("2023-11-01T23:59:59"),
      };
      await useCase.execute(input);
    }).rejects.toThrow(new Error("Coupon not found"));
  });
});
