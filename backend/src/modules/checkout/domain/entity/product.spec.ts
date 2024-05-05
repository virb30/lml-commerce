import { Dimensions } from "../value-object/dimensions";
import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "./product";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { InputError } from "@modules/shared/errors/input.error";

describe("Product", () => {
  it("creates a product", () => {
    const productProps = {
      name: "Fone de ouvido",
      price: new BRLCurrency(10.0),
      dimensions: new Dimensions(1, 2, 3),
      weight: 6,
    };
    const product = Product.create(productProps);
    expect(product.id).toBeInstanceOf(Id);
    expect(product.name).toEqual("Fone de ouvido");
    expect(product.price.value).toBe(10.0);
    expect(product.getDensity()).toBe(1);
    expect(product.getVolume()).toBe(6);
  });

  it("creates a product without dimensions", () => {
    const productProps = {
      name: "Fone de ouvido",
      price: new BRLCurrency(10.0),
    };
    const product = Product.create(productProps);
    expect(product.id).toBeInstanceOf(Id);
    expect(product.name).toEqual("Fone de ouvido");
    expect(product.price.value).toBe(10.0);
    expect(product.getDensity()).toBe(0);
    expect(product.getVolume()).toBe(0);
  });

  it("creates a product without weight", () => {
    const productProps = {
      name: "Fone de ouvido",
      price: new BRLCurrency(10.0),
      dimensions: new Dimensions(1, 2, 3),
    };
    const product = Product.create(productProps);
    expect(product.id).toBeInstanceOf(Id);
    expect(product.name).toEqual("Fone de ouvido");
    expect(product.price.value).toBe(10.0);
    expect(product.getDensity()).toBe(0);
    expect(product.getVolume()).toBe(6);
  });

  it("does not create a product with invalid weight", () => {
    expect(() => {
      const productProps = {
        name: "Fone de ouvido",
        price: new BRLCurrency(10.0),
        dimensions: new Dimensions(10, 20, 30),
        weight: -1,
      };
      Product.create(productProps);
    }).toThrowErrorTypeWithMessage(InputError, "Invalid weight");
  });
});
