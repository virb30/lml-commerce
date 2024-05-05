import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "./product";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { InputError } from "@modules/shared/errors/input.error";

describe("Product entity tests", () => {
  it("creates a product", () => {
    const product = Product.create({ name: "Produto Teste", price: new BRLCurrency(100) });
    expect(product.id).toBeDefined();
    expect(product.id).toBeInstanceOf(Id);
    expect(product.name).toBe("Produto Teste");
    expect(product.price.value).toBe(100);
    expect(product.createdAt).toBeDefined();
    expect(product.updatedAt).toBeDefined();
  });

  it("restore a product", () => {
    const id = new Id();
    const date = new Date("2024-01-01T10:00:00");
    const product = Product.restore({
      id,
      name: "Produto Teste",
      price: new BRLCurrency(100),
      createdAt: date,
      updatedAt: date,
    });
    expect(product.id).toBeDefined();
    expect(product.id.value).toEqual(id.value);
    expect(product.name).toBe("Produto Teste");
    expect(product.price.value).toBe(100);
    expect(product.createdAt).toEqual(date);
    expect(product.updatedAt).toEqual(date);
  });

  it("does not create a product with empty name", () => {
    expect(() => {
      Product.create({ name: "", price: new BRLCurrency(10) });
    }).toThrowErrorTypeWithMessage(InputError, "Invalid name");
  });

  it("does not change a product name with empty value", () => {
    expect(() => {
      const product = Product.create({ name: "Produto Teste", price: new BRLCurrency(100) });
      product.changeName("");
    }).toThrowErrorTypeWithMessage(InputError, "Invalid name");
  });
});
