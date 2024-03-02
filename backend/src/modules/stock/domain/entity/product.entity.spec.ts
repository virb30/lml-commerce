import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "./product.entity";

describe("Product", () => {
  it("creates a product", () => {
    const product = new Product(new Id("1"), "Fone de ouvido");
    expect(product.id.value).toEqual("1");
    expect(product.name).toEqual("Fone de ouvido");
  });
});
