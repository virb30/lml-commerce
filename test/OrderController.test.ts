import supertest from "supertest";
import { ExpressHttpAdapter } from "../src/Infra/Http/ExpressHttpAdapter";
import { OrderRepositoryMemory } from "../src/Infra/Repository/OrderRepositoryMemory";
import { ProductRepositoryMemory } from "../src/Infra/Repository/ProductRepositoryMemory";
import { Product } from "../src/Domain/Entity/Product";
import { Id } from "../src/Domain/ValueObjects/Id";
import { Dimensions } from "../src/Domain/ValueObjects/Dimensions";
import HttpStatus from "http-status-codes";
import { OrderController } from "../src/Infra/Controller/OrderController";

describe("OrderController tests", () => {
  it("POST /orders", async () => {
    const http = new ExpressHttpAdapter();
    const orderRepository = new OrderRepositoryMemory();
    const productRepository = new ProductRepositoryMemory();
    await productRepository.save(new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(1, 2, 3), 0.5));
    await productRepository.save(new Product(new Id("2"), "Placa de vídeo", 3800.0, new Dimensions(2, 2, 5), 5));

    new OrderController(http, orderRepository, productRepository);

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
    expect(response.body.total).toBe(3820.0);
  });
});
