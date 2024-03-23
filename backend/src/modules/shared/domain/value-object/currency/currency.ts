export abstract class Currency {
  static readonly className: string;
  readonly code: string;

  constructor(public readonly value: number) {
    this.validate();
  }

  private validate(): void {
    if (this.value < 0) throw new Error("Invalid value");
  }

  abstract formattedValue(): string;
}
