import { OrderItem } from "./order-item";
import { Product } from "./product";
import { Dimensions } from "../value-object/dimensions";
import { Id } from "@modules/shared/domain/value-object/id";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";

describe("OrderItem", () => {
  const product = Product.create({
    name: "Fone de ouvido",
    price: new BRLCurrency(10.0),
    dimensions: new Dimensions(10, 20, 30),
    weight: 0,
  });
  it("calculates item total", () => {
    const item = OrderItem.create({ price: product.price, amount: 2 });
    expect(item.total).toEqual(20);
  });

  it("increments amount if item is duplicated", () => {
    const item = OrderItem.create({ price: product.price, amount: 1 });
    item.incrementAmount(2);
    expect(item.amount).toEqual(3);
    expect(item.total).toEqual(30.0);
  });
});
