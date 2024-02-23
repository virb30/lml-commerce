import { Queue } from "src/modules/queue/queue.interface";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { ProductRepositoryMemory } from "../repository/memory/product.repository";
import { MemoryQueueAdapter } from "src/modules/queue/adapter/memory/memory-queue.adapter";
import { CreateProductUseCase } from "./create-product.usecase";
import { UpdateProductUseCase } from "./update-product.usecase";
import { ProductUpdated } from "../domain/event/product-updated.evet";

describe("Should update product information", () => {
  let productRepository: ProductRepository;
  let queue: Queue;
  let idProduct: string;

  beforeEach(async () => {
    productRepository = new ProductRepositoryMemory();
    queue = new MemoryQueueAdapter();
    const createProductUsecase = new CreateProductUseCase(productRepository, queue);
    const { id } = await createProductUsecase.execute({ name: "Product before update", price: 1000 });
    idProduct = id;
  });

  it("should update a product", async () => {
    const updateProductUsecase = new UpdateProductUseCase(productRepository, queue);
    const afterUpdate = { id: idProduct, name: "Product after update", price: 2000 };
    const result = await updateProductUsecase.execute(afterUpdate);
    expect(result).toEqual({
      id: afterUpdate.id,
      name: "Product after update",
      price: 2000,
      finalPrice: 20,
    });
  });

  it("publishes ProductUpdated event", async () => {
    const updateProductUsecase = new UpdateProductUseCase(productRepository, queue);
    const date = new Date("2021-01-01T00:00:00");
    const spyFunction = jest.fn();
    const expected = {
      id: idProduct,
      name: "Product after update",
      price: 2000,
      finalPrice: 20,
    };
    const productUpdate = new ProductUpdated(expected, date);

    queue.consume(productUpdate.getName(), spyFunction);
    const output = await updateProductUsecase.execute({
      id: expected.id,
      name: expected.name,
      price: expected.price,
      date,
    });

    expect(output).toEqual(expected);
    expect(spyFunction).toHaveBeenCalledWith(productUpdate);
  });

  it("should throw an error when trying to update a non-existent product", async () => {
    const updateProductUsecase = new UpdateProductUseCase(productRepository, queue);
    await expect(
      updateProductUsecase.execute({ id: "non-existent-id", name: "Product after update", price: 2000 }),
    ).rejects.toThrow();
  });
});
