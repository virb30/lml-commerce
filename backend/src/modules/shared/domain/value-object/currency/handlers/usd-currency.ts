import { Currency } from "../currency";

export default class USDCurrency extends Currency {
  public readonly code: string = "usd";
  formattedValue(): string {
    return this.value.toFixed(2);
  }
}
