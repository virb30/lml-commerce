import { Id } from "src/modules/shared/domain/value-object/id";

export class StockEntry {
  constructor(
    public readonly productId: Id,
    public readonly operation: "in" | "out",
    public readonly quantity: number,
  ) {}
}
