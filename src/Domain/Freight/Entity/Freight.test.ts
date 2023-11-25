import { Freight } from "./Freight";
import { Product } from "../../Product/Entity/Product";
import { Dimensions } from "../../Product/ValueObject/Dimensions";
import { Id } from "../../@shared/ValueObject/Id";

describe("Freight tests", () => {
  it("should calculate freight", () => {
    const freight = new Freight();
    freight.addItem(new Product(new Id("1"), "Fone de ouvido", 40, new Dimensions(10, 10, 10), 1), 3);
    freight.addItem(new Product(new Id("2"), "Placa de vídeo", 3800, new Dimensions(50, 50, 50), 10), 1);
    freight.addItem(new Product(new Id("3"), "Gabinete", 300, new Dimensions(100, 30, 10), 3), 1);
    const total = freight.getTotal();
    expect(total).toBe(160);
  });

  it("should calculate freight with minimum price", () => {
    const freight = new Freight();
    freight.addItem(new Product(new Id("1"), "Fone de ouvido", 40, new Dimensions(10, 10, 10), 0.9), 1);
    const total = freight.getTotal();
    expect(total).toBe(10);
  });

  it("should calculate freight free", () => {
    const freight = new Freight();
    freight.addItem(new Product(new Id("1"), "Web Storm", 600), 1);
    const total = freight.getTotal();
    expect(total).toBe(0);
  });
});
