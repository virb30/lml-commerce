import { Id } from "src/modules/shared/domain/value-object/id";
import { OrderPlaced } from "src/modules/checkout/domain/event/order-placed";
import { MemoryQueueAdapter } from "../../queue/adapter/memory/memory-queue.adapter";
import { Queue } from "../../queue/queue.interface";
import { StockProcessor } from "./stock.processor";
import { StockEntryRepositoryMemory } from "../repository/memory/stock-entry.repository";

describe("StockProcessor tests", () => {
  const stockEntryRepository = new StockEntryRepositoryMemory();
  let queue: Queue;

  beforeEach(async () => {
    await stockEntryRepository.clear();
    queue = new MemoryQueueAdapter();
  });
  it("should update stock after order placed", async () => {
    new StockProcessor(queue, stockEntryRepository);

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
