import { AddProductStockUseCase } from "./add-product-stock.usecase";
import { StockEntryRepositoryMemory } from "../repository/memory/stock-entry.repository";
import { ProductRepositoryMemory } from "../repository/memory/product.repository";
import { Product } from "../domain/entity/product.entity";
import { Id } from "src/modules/shared/domain/value-object/id";
import { MemoryQueueAdapter } from "src/modules/queue/adapter/memory/memory-queue.adapter";
import { StockProductAdded } from "../domain/event/stock-product-added.event";

describe("Add product stock UseCase", () => {
  const stockEntryRepository = new StockEntryRepositoryMemory();
  const productRepository = new ProductRepositoryMemory();
  const queueAdapter = new MemoryQueueAdapter();
  const usecase = new AddProductStockUseCase(productRepository, stockEntryRepository, queueAdapter);

  beforeEach(async () => {
    stockEntryRepository.clear();
    productRepository.clear();
    await productRepository.save(new Product(new Id("1"), "Fone de ouvido"));
  });

  it("should add a product stock", async () => {
    const input = {
      productId: "1",
      quantity: 10,
      date: new Date("2021-01-01T00:00:00"),
    };
    const output = await usecase.execute(input);
    expect(output.productId).toBe("1");
  });

  it("should throw an error if the product does not exist", () => {
    const input = {
      productId: "invalidId",
      quantity: 10,
      date: new Date("2021-01-01T00:00:00"),
    };
    expect(async () => {
      await usecase.execute(input);
    }).rejects.toThrow(new Error("Product not found"));
  });

  it("should throw an error if the quantity is not valid", async () => {
    const input = {
      productId: "1",
      quantity: 0,
      date: new Date("2021-01-01T00:00:00"),
    };
    expect(async () => {
      await usecase.execute(input);
    }).rejects.toThrow(new Error("Quantity cannot be less than or equal to 0"));
  });

  it("Should add a product stock and trigger event", async () => {
    const spyFunction = jest.fn();
    const date = new Date("2021-01-01T00:00:00");
    const input = {
      productId: "1",
      quantity: 10,
      date,
    };
    const stockProductAdded = new StockProductAdded(
      {
        productId: input.productId,
        quantity: input.quantity,
      },
      date,
    );

    queueAdapter.consume(stockProductAdded.getName(), spyFunction);
    await usecase.execute(input);
    expect(spyFunction).toHaveBeenCalledWith(stockProductAdded);
  });
});
