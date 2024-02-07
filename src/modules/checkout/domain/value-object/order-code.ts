export class OrderCode {
  public readonly value: string;
  constructor(date: Date, sequence: number) {
    this.value = this.generate(date, sequence);
  }

  private generate(date: Date, sequence: number): string {
    const yearDate = date.getFullYear();
    const formattedSequence = sequence.toString().padStart(8, "0");
    return `${yearDate}${formattedSequence}`;
  }
}
