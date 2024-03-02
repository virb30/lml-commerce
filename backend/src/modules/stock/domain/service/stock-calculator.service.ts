import { StockEntry } from "../entity/stock-entry.entity";

export class StockCalculator {
  public static calculate(stockEntries: StockEntry[]): number {
    return stockEntries.reduce((total, stockEntry) => {
      if (stockEntry.operation === "in") {
        total += stockEntry.quantity;
      }
      if (stockEntry.operation === "out") {
        total -= stockEntry.quantity;
      }
      return total;
    }, 0);
  }
}
