import { StockEntry } from "../src/Domain/Entity/StockEntry";
import { StockCalculator } from "../src/Domain/Service/StockCalculator";
import { Id } from "../src/Domain/ValueObjects/Id";

describe("StockCalculator tests", () => {
  it("should calculate stock", () => {
    const stockEntries = [
      new StockEntry(new Id("1"), "in", 10),
      new StockEntry(new Id("1"), "in", 5),
      new StockEntry(new Id("1"), "out", 2),
      new StockEntry(new Id("1"), "out", 3),
    ];
    const stock = StockCalculator.calculate(stockEntries);
    expect(stock).toBe(10);
  });
});
