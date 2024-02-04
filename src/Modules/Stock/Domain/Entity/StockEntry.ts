import { Id } from "../../../@shared/Domain/ValueObject/Id";

export class StockEntry {
  constructor(
    public readonly productId: Id,
    public readonly operation: "in" | "out",
    public readonly quantity: number,
  ) {}
}
