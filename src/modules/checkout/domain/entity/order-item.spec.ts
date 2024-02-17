import { OrderItem } from "./order-item";
import { Product } from "./product";
import { Dimensions } from "../value-object/dimensions";
import { Id } from "src/modules/shared/domain/value-object/id";

describe("OrderItem", () => {
  it("calculates item total", () => {
    const product = new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0);
    const item = new OrderItem(product.id, product.price, 2);
    expect(item.total).toEqual(20);
  });

  it("increments amount if item is duplicated", () => {
    const product = new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0);
    const item = new OrderItem(product.id, product.price, 1);

    item.incrementAmount(2);

    expect(item.amount).toEqual(3);
    expect(item.total).toEqual(30.0);
  });
});
