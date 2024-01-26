import { StockEntry } from "../Entity/StockEntry";
import { StockCalculator } from "./StockCalculator";
import { Id } from "../../../@shared/Domain/ValueObject/Id";

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
