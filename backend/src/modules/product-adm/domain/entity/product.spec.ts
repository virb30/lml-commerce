import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "./product";

describe("Product entity tests", () => {
  it("creates a product", () => {
    const id = new Id();
    const date = new Date("2024-01-01T10:00:00");
    const product = new Product(id, "Produto Teste", 100, date);
    expect(product.id).toBeDefined();
    expect(product.id.value).toEqual(id.value);
    expect(product.name).toBe("Produto Teste");
    expect(product.price).toBe(100);
    expect(product.createdAt).toEqual(date);
  });

  it("creates a product with default createdAt", () => {
    const id = new Id();
    const product = new Product(id, "Produto Teste", 100);
    expect(product.id).toBeDefined();
    expect(product.id.value).toEqual(id.value);
    expect(product.name).toBe("Produto Teste");
    expect(product.price).toBe(100);
    expect(product.createdAt).toBeDefined;
  });

  it("calculates final price", () => {
    const id = new Id();
    const product = new Product(id, "Produto Teste", 1000);
    expect(product.getFinalPrice()).toBe(10);
  });

  it("does not create a product with invalid price", () => {
    expect(() => {
      new Product(new Id(), "Produto Teste", -10);
    }).toThrow(new Error("Invalid value"));
  });

  it("does not change a product with invalid price", () => {
    expect(() => {
      const product = new Product(new Id(), "Produto Teste", 10);
      product.changePrice(-10);
    }).toThrow(new Error("Invalid value"));
  });

  it("truncates float price", () => {
    const id = new Id();
    const product = new Product(id, "Produto Teste", 50.5);
    expect(product.price).toBe(50);
    expect(product.getFinalPrice()).toBe(0.5);
  });

  it("does not create a product with empty name", () => {
    expect(() => {
      new Product(new Id(), "", 10);
    }).toThrow(new Error("Invalid name"));
  });

  it("does not change a product name with empty value", () => {
    expect(() => {
      const product = new Product(new Id(), "Produto Teste", 10);
      product.changeName("");
    }).toThrow(new Error("Invalid name"));
  });
});
