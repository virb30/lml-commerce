import { Freight } from "./freight";
import { Product } from "./product";
import { Dimensions } from "../value-object/dimensions";
import { Id } from "@modules/shared/domain/value-object/id";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";

describe("Freight tests", () => {
  it("should calculate freight", () => {
    const freight = new Freight();
    freight.addItem(new Product(new Id("1"), "Fone de ouvido", new BRLCurrency(40), new Dimensions(10, 10, 10), 1), 3);
    freight.addItem(
      new Product(new Id("2"), "Placa de vídeo", new BRLCurrency(3800), new Dimensions(50, 50, 50), 10),
      1,
    );
    freight.addItem(new Product(new Id("3"), "Gabinete", new BRLCurrency(300), new Dimensions(100, 30, 10), 3), 1);
    const total = freight.getTotal();
    expect(total).toBe(160);
  });

  it("should calculate freight with minimum price", () => {
    const freight = new Freight();
    freight.addItem(
      new Product(new Id("1"), "Fone de ouvido", new BRLCurrency(40), new Dimensions(10, 10, 10), 0.9),
      1,
    );
    const total = freight.getTotal();
    expect(total).toBe(10);
  });

  it("should calculate freight free", () => {
    const freight = new Freight();
    freight.addItem(new Product(new Id("1"), "Web Storm", new BRLCurrency(600)), 1);
    const total = freight.getTotal();
    expect(total).toBe(0);
  });
});
