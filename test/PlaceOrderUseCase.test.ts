import { PlaceOrderUseCase } from "../src/Application/PlaceOrderUseCase";
import Coupon from "../src/Domain/Entity/Coupon";
import { Product } from "../src/Domain/Entity/Product";
import { CouponRepository } from "../src/Domain/Repository/CouponRepository";
import { ProductRepository } from "../src/Domain/Repository/ProductRepository";
import { Dimensions } from "../src/Domain/ValueObjects/Dimensions";
import { Id } from "../src/Domain/ValueObjects/Id";
import { MemoryRepositoryFactory } from "../src/Infra/Factory/MemoryRepositoryFactory";
import { CouponRepositoryMemory } from "../src/Infra/Repository/CouponRepositoryMemory";
import { OrderRepositoryMemory } from "../src/Infra/Repository/OrderRepositoryMemory";
import { ProductRepositoryMemory } from "../src/Infra/Repository/ProductRepositoryMemory";

describe("Place order use case tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  let productRepository: ProductRepository;
  let couponRepository: CouponRepository;

  beforeEach(async () => {
    productRepository = repositoryFactory.makeProductRepository();
    couponRepository = repositoryFactory.makeCouponRepository();
    await productRepository.clear();
    await couponRepository.clear();
  });

  it("should place an order", async () => {
    productRepository.save(new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0));
    productRepository.save(new Product(new Id("2"), "Bicicleta", 1500.0, new Dimensions(10, 20, 30), 0));
    const useCase = new PlaceOrderUseCase(repositoryFactory);
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
    });
  });

  it("should throw exception if product not exists ", async () => {
    expect(async () => {
      const useCase = new PlaceOrderUseCase(repositoryFactory);
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
    const useCase = new PlaceOrderUseCase(repositoryFactory);
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
    });
  });

  it("should place an order with discount", async () => {
    expect(async () => {
      productRepository.save(new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0));
      productRepository.save(new Product(new Id("2"), "Bicicleta", 1500.0, new Dimensions(10, 20, 30), 0));
      const useCase = new PlaceOrderUseCase(repositoryFactory);
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
