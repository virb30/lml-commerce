import { MemoryQueueAdapter } from "../../queue/adapter/memory/memory-queue.adapter";
import { Queue } from "../../queue/queue.interface";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { ProductRepositoryMemory } from "../repository/memory/product.repository";
import { CreateProductUseCase } from "./create-product.usecase";

describe("CreateProductUseCase tests", () => {
  let usecase: CreateProductUseCase;
  let productRepository: ProductRepository;
  let queue: Queue;

  beforeEach(() => {
    productRepository = new ProductRepositoryMemory();
    queue = new MemoryQueueAdapter();
    usecase = new CreateProductUseCase(productRepository, queue);
  });

  it("creates a product", async () => {
    const input = {
      name: "Product 1",
      price: 1000,
    };
    const output = await usecase.execute(input);
    expect(output.id).toBeDefined();
    expect(output.name).toBe(input.name);
    expect(output.price).toBe(input.price);
    expect(output.finalPrice).toBe(10);
    expect(output.createdAt).toBeDefined();
  });

  it("publishes ProductCreated event", async () => {
    const spy = jest.spyOn(queue, "publish");

    const input = {
      name: "Product 1",
      price: 1000,
    };
    const output = await usecase.execute(input);
    expect(output.id).toBeDefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
