import { Currency } from "./currency";

describe("Currency tests", () => {
  it("creates a currency", () => {
    const currency = new Currency(1050);
    expect(currency.value).toBe(1050);
  });

  it("creates a currency from float", () => {
    const currency = Currency.fromFloat(10.5);
    expect(currency.value).toBe(1050);
  });

  it("does not create a currency with invalid value", () => {
    expect(() => {
      new Currency(-10.5);
    }).toThrow(new Error("Invalid value"));
  });
});
