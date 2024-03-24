import { BRLCurrency } from "./handlers/brl-currency";

export class CurrencyFactory {
  static instance: CurrencyFactory;

  currencyMapper: { [code: string]: any };

  private constructor() {
    this.currencyMapper = {};
  }

  static getInstance() {
    if (!CurrencyFactory.instance) {
      CurrencyFactory.instance = new CurrencyFactory();
    }
    return CurrencyFactory.instance;
  }

  register(code: string, handler: any) {
    if (this.currencyMapper[code]) throw new Error("Currency already registered");
    this.currencyMapper[code] = handler;
  }

  static make(value: number, currency?: string) {
    const currencyMapper = CurrencyFactory.getInstance().currencyMapper;
    if (!currency || !currencyMapper[currency]) {
      throw new Error("Currency not registered");
    }
    return new currencyMapper[currency](value);
  }
}
