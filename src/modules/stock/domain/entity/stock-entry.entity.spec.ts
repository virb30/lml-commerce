import { StockEntry } from "./stock-entry.entity";
import { Id } from "src/modules/shared/domain/value-object/id";

describe("StockEntry tests", () => {
  it("should create a stock entry", () => {
    const productId = new Id("1");
    const stockEntry = new StockEntry(productId, "in", 3);
    expect(stockEntry.operation).toBe("in");
    expect(stockEntry.productId.value).toBe("1");
    expect(stockEntry.quantity).toBe(3);
  });

  it.each([0, -3])("should throw exception if quantity is less than or equal to 0", (quantity) => {
    const productId = new Id("1");

    expect(() => {
      const stockEntry = new StockEntry(productId, "in", quantity);
    }).toThrow(new Error("Quantity cannot be less than or equal to 0"));
  });
});
