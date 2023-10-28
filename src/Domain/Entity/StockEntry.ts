import { Id } from "../ValueObjects/Id";

export class StockEntry {
  constructor(
    public readonly productId: Id,
    public readonly operation: "in" | "out",
    public readonly quantity: number,
  ) {}
}
