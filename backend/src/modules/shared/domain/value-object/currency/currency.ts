import { InputError } from "@modules/shared/errors/input.error";

export abstract class Currency {
  static readonly className: string;
  readonly code: string;

  constructor(public readonly value: number) {
    this.validate();
  }

  private validate(): void {
    if (this.value < 0) throw new InputError("Invalid value");
  }

  abstract formattedValue(): string;
}
