import { BRLCurrency } from "./handlers/brl-currency";
import { Currency } from "./currency";
import { CurrencyFactory } from "./currency.factory";

class TestCurrency extends Currency {
  public readonly code = "tst";
  formattedValue(): string {
    return this.value.toString();
  }
}

describe("CurrencyFactory tests", () => {
  it("creates a currency", () => {
    const factory = CurrencyFactory.getInstance();
    factory.register("tst", TestCurrency);
    factory.register("brl", BRLCurrency);

    const currency1 = CurrencyFactory.make(100, "tst");
    const currency2 = CurrencyFactory.make(100, "brl");

    expect(currency1).toBeInstanceOf(TestCurrency);
    expect(currency2).toBeInstanceOf(BRLCurrency);
  });

  it("throws and error trying to create a non registered currency", () => {
    expect(() => {
      CurrencyFactory.make(100, "und");
    }).toThrow(new Error("Currency not registered"));
  });

  it("throws an error when trying to register a currency already registered", () => {
    expect(() => {
      const factory = CurrencyFactory.getInstance();
      factory.register("brl", BRLCurrency);
      factory.register("brl", BRLCurrency);
    }).toThrow(new Error("Currency already registered"));
  });
});
