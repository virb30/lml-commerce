import { Dimensions } from "../value-object/dimensions";
import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "./product";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { InputError } from "@modules/shared/errors/input.error";

describe("Product", () => {
  it("creates a product", () => {
    const product = new Product(new Id("1"), "Fone de ouvido", new BRLCurrency(10.0), new Dimensions(1, 2, 3), 6);
    expect(product.id.value).toEqual("1");
    expect(product.name).toEqual("Fone de ouvido");
    expect(product.price.value).toBe(10.0);
    expect(product.getDensity()).toBe(1);
    expect(product.getVolume()).toBe(6);
  });

  it("creates a product without dimensions", () => {
    const product = new Product(new Id("1"), "Fone de ouvido", new BRLCurrency(10.0));
    expect(product.id.value).toEqual("1");
    expect(product.name).toEqual("Fone de ouvido");
    expect(product.price.value).toBe(10.0);
    expect(product.getDensity()).toBe(0);
    expect(product.getVolume()).toBe(0);
  });

  it("creates a product without weight", () => {
    const product = new Product(new Id("1"), "Fone de ouvido", new BRLCurrency(10.0), new Dimensions(1, 2, 3));
    expect(product.id.value).toEqual("1");
    expect(product.name).toEqual("Fone de ouvido");
    expect(product.price.value).toBe(10.0);
    expect(product.getDensity()).toBe(0);
    expect(product.getVolume()).toBe(6);
  });

  it("does not create a product with invalid weight", () => {
    expect(() => {
      new Product(new Id("1"), "Fone de ouvido", new BRLCurrency(10.0), new Dimensions(10, 20, 30), -1);
    }).toThrowErrorTypeWithMessage(InputError, "Invalid weight");
  });
});
