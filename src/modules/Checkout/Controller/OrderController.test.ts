import supertest from "supertest";
import { ExpressHttpAdapter } from "../../../Infra/@shared/Http/ExpressHttpAdapter";
import { Product } from "../../../modules/Checkout/Domain/Entity/Product";
import { Id } from "../../../Domain/@shared/ValueObject/Id";
import { Dimensions } from "../Domain/Entity/Dimensions";
import HttpStatus from "http-status-codes";
import { OrderController } from "./OrderController";
import { MemoryRepositoryFactory } from "../../../Infra/@shared/Factory/MemoryRepositoryFactory";
import { ProductRepository } from "../../../modules/Checkout/Domain/Repository/ProductRepository";
import { MemoryQueueAdapter } from "../../../Infra/@shared/Queue/MemoryQueueAdapter";
import { Queue } from "../../../Infra/@shared/Queue/Queue";
import { PlaceOrderUseCase } from "../../../modules/Checkout/UseCase/PlaceOrderUseCase";
import { Registry } from "../../../Infra/@shared/DI/Registry";
import { Http } from "../../../Infra/@shared/Http/Http";

describe("OrderController tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  let productRepository: ProductRepository;
  let http: Http;
  let queue: Queue;

  beforeEach(async () => {
    productRepository = repositoryFactory.makeProductRepository();
    queue = new MemoryQueueAdapter();
    http = new ExpressHttpAdapter();
    const placeOrderUseCase = new PlaceOrderUseCase(repositoryFactory, queue);
    const registry = Registry.getInstance();
    registry.register("httpServer", http);
    registry.register("placeOrder", placeOrderUseCase);
    registry.register("queue", queue);
  });

  it("POST /orders", async () => {
    await productRepository.save(new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(1, 2, 3), 0.5));
    await productRepository.save(new Product(new Id("2"), "Placa de vídeo", 3800.0, new Dimensions(2, 2, 5), 5));

    new OrderController();

    const input = {
      email: "cliente@email.com",
      items: [
        { product_id: "1", amount: 2 },
        { product_id: "2", amount: 1 },
      ],
      date: "2023-01-01T10:00:00",
    };

    const response = await supertest(http.app).post("/orders").send(input);

    expect(response.statusCode).toBe(HttpStatus.CREATED);
    expect(response.body.total).toBe(3880.0);
  });
});
