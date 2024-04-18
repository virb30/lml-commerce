import { Id } from "@modules/shared/domain/value-object/id";
import { InputError } from "@modules/shared/errors/input.error";

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
      throw new InputError("Quantity cannot be less than or equal to 0");
    }
  }
}
