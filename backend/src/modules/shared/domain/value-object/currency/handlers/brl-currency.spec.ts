import { InputError } from "@modules/shared/errors/input.error";
import { BRLCurrency } from "./brl-currency";

describe("BRLCurrency tests", () => {
  it("creates a currency", () => {
    const currency = new BRLCurrency(100);
    expect(currency.value).toBe(100);
    expect(currency.formattedValue()).toMatch(/[R$].100,00/);
    expect(currency.code).toBe("brl");
  });

  it("does not create a currency with invalid value", () => {
    expect(() => {
      new BRLCurrency(-10.5);
    }).toThrowErrorTypeWithMessage(InputError, "Invalid value");
  });
});
