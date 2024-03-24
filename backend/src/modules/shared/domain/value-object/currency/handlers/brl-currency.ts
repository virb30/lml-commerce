import { Currency } from "../currency";

export class BRLCurrency extends Currency {
  public readonly code = "brl";

  formattedValue() {
    return new Intl.NumberFormat("pt-BR", { currency: "BRL", style: "currency" }).format(this.value);
  }
}
