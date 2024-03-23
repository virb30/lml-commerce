import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "./product";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";

describe("Product entity tests", () => {
  it("creates a product", () => {
    const id = new Id();
    const date = new Date("2024-01-01T10:00:00");
    const product = new Product(id, "Produto Teste", new BRLCurrency(100), date);
    expect(product.id).toBeDefined();
    expect(product.id.value).toEqual(id.value);
    expect(product.name).toBe("Produto Teste");
    expect(product.price.value).toBe(100);
    expect(product.createdAt).toEqual(date);
  });

  it("creates a product with default createdAt", () => {
    const id = new Id();
    const product = new Product(id, "Produto Teste", new BRLCurrency(100));
    expect(product.id).toBeDefined();
    expect(product.id.value).toEqual(id.value);
    expect(product.name).toBe("Produto Teste");
    expect(product.price.value).toBe(100);
    expect(product.createdAt).toBeDefined;
  });

  it("does not create a product with empty name", () => {
    expect(() => {
      new Product(new Id(), "", new BRLCurrency(10));
    }).toThrow(new Error("Invalid name"));
  });

  it("does not change a product name with empty value", () => {
    expect(() => {
      const product = new Product(new Id(), "Produto Teste", new BRLCurrency(10));
      product.changeName("");
    }).toThrow(new Error("Invalid name"));
  });
});
