import { Id } from "../../@shared/Domain/ValueObject/Id";
import { OrderPlaced } from "../../Checkout/Domain/Event/OrderPlaced";
import { MemoryRepositoryFactory } from "../../@shared/Factory/MemoryRepositoryFactory";
import { StockHandler } from "./StockHandler";

describe("StockHandler tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  const stockEntryRepository = repositoryFactory.makeStockEntryRepository();

  beforeEach(async () => {
    await stockEntryRepository.clear();
  });

  it("should register stock entry on OrderPlaced", async () => {
    const handler = new StockHandler(repositoryFactory);
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
