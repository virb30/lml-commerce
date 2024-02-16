import { Id } from "src/modules/shared/domain/value-object/id";
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
    }).toThrow(new Error("Invalid price"));
  });

  it("truncates float price", () => {
    const id = new Id();
    const product = new Product(id, "Produto Teste", 50.5);
    expect(product.price).toBe(50);
    expect(product.getFinalPrice()).toBe(0.5);
  });
});
