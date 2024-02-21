import { Id } from "src/modules/shared/domain/value-object/id";

export class StockEntry {
  constructor(
    public readonly productId: Id,
    public readonly operation: "in" | "out",
    public readonly quantity: number,
  ) {
    this.validate();
  }

  validate(): void {
    if (this.quantity <= 0) {
      throw new Error("Quantity cannot be less than or equal to 0");
    }
  }
}
