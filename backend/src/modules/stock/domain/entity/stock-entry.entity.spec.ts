import { InputError } from "@modules/shared/errors/input.error";
import { StockEntry } from "./stock-entry.entity";
import { Id } from "@modules/shared/domain/value-object/id";

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
      new StockEntry(productId, "in", quantity);
    }).toThrowErrorTypeWithMessage(InputError, "Quantity cannot be less than or equal to 0");
  });
});
