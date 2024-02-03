import { MemoryQueueAdapter } from "../../../Infra/Queue/MemoryQueueAdapter";
import { Queue } from "../../../Infra/Queue/Queue";
import { DomainEvent } from "../../@shared/Domain/Event/DomainEvent";
import { ProductRepository } from "../Domain/Repository/ProductRepository";
import { ProductRepositoryMemory } from "../Repository/Memory/ProductRepositoryMemory";
import { CreateProductUseCase } from "./CreateProductUseCase";

describe("CreateProductUseCase tests", () => {
  let usecase: CreateProductUseCase;
  let productRepository: ProductRepository;
  let queue: Queue;

  beforeEach(() => {
    productRepository = new ProductRepositoryMemory();
    queue = new MemoryQueueAdapter();
    usecase = new CreateProductUseCase(productRepository, queue);
  });

  it("Should create a product", async () => {
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

  it("Should publish ProductCreated event", async () => {
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
