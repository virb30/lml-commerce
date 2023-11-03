import supertest from "supertest";
import { ExpressHttpAdapter } from "../src/Infra/Http/ExpressHttpAdapter";
import { Product } from "../src/Domain/Entity/Product";
import { Id } from "../src/Domain/ValueObjects/Id";
import { Dimensions } from "../src/Domain/ValueObjects/Dimensions";
import HttpStatus from "http-status-codes";
import { OrderController } from "../src/Infra/Controller/OrderController";
import { MemoryRepositoryFactory } from "../src/Infra/Factory/MemoryRepositoryFactory";
import { ProductRepository } from "../src/Domain/Repository/ProductRepository";

describe("OrderController tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  let productRepository: ProductRepository;
  beforeEach(async () => {
    productRepository = repositoryFactory.makeProductRepository();
  });

  it("POST /orders", async () => {
    const http = new ExpressHttpAdapter();
    await productRepository.save(new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(1, 2, 3), 0.5));
    await productRepository.save(new Product(new Id("2"), "Placa de vídeo", 3800.0, new Dimensions(2, 2, 5), 5));

    new OrderController(http, repositoryFactory);

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
