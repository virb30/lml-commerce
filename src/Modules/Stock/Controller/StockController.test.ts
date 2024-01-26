import { Id } from "../../@shared/Domain/ValueObject/Id";
import { OrderPlaced } from "../../Checkout/Domain/Event/OrderPlaced";
import { MemoryRepositoryFactory } from "../../@shared/Factory/MemoryRepositoryFactory";
import { MemoryQueueAdapter } from "../../../Infra/Queue/MemoryQueueAdapter";
import { Queue } from "../../../Infra/Queue/Queue";
import { StockController } from "./StockController";

describe("StockController tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  const stockEntryRepository = repositoryFactory.makeStockEntryRepository();
  let queue: Queue;

  beforeEach(async () => {
    await stockEntryRepository.clear();
    queue = new MemoryQueueAdapter();
  });
  it("should update stock after order placed", async () => {
    new StockController(queue, repositoryFactory);

    await queue.publish(
      new OrderPlaced({
        orderId: "1",
        items: [{ productId: "1", amount: 2 }],
        total: 20.0,
      }),
    );

    const stockEntries = await stockEntryRepository.getByProductId(new Id("1"));
    expect(stockEntries).toHaveLength(1);
    expect(stockEntries[0].operation).toEqual("out");
    expect(stockEntries[0].quantity).toBe(2);
  });
});
