import { StockEntry } from "./StockEntry";
import { Id } from "../ValueObjects/Id";

describe("StockEntry tests", () => {
  it("should create a stock entry", () => {
    const productId = new Id("1");
    const stockEntry = new StockEntry(productId, "in", 3);
    expect(stockEntry.operation).toBe("in");
    expect(stockEntry.productId.value).toBe("1");
    expect(stockEntry.quantity).toBe(3);
  });
});
