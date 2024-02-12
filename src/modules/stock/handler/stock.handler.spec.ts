import { Id } from "src/modules/shared/domain/value-object/id";
import { OrderPlaced } from "src/modules/checkout/domain/event/order-placed";
import { StockHandler } from "./stock.handler";
import { StockEntryRepositoryMemory } from "../repository/memory/stock-entry.repository";

describe("StockHandler tests", () => {
  const stockEntryRepository = new StockEntryRepositoryMemory();

  beforeEach(async () => {
    await stockEntryRepository.clear();
  });

  it("should register stock entry on OrderPlaced", async () => {
    const handler = new StockHandler(stockEntryRepository);
    const payload = {
      orderId: "1",
      items: [
        { productId: "1", amount: 1 },
        { productId: "2", amount: 2 },
        { productId: "3", amount: 1 },
      ],
      total: 40.0,
    };
    const orderPlaced = new OrderPlaced(payload);
    await handler.handle(orderPlaced);
    const stockEntries = await stockEntryRepository.getByProductId(new Id("1"));
    expect(stockEntries).toHaveLength(1);
    expect(stockEntries[0].operation).toBe("out");
    expect(stockEntries[0].quantity).toBe(1);
  });
});
