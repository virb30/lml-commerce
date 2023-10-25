import { OrderItem } from "../src/Domain/Entity/OrderItem";
import { Product } from "../src/Domain/Entity/Product";
import { Dimensions } from "../src/Domain/ValueObjects/Dimensions";
import { Id } from "../src/Domain/ValueObjects/Id";

describe("OrderItem", () => {
  it("Should calculate total", () => {
    const product = new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0);
    const item = new OrderItem(product.id, product.price, 2);
    expect(item.total).toEqual(20);
  });

  it("Should increment amount", () => {
    const product = new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0);
    const item = new OrderItem(product.id, product.price, 1);

    item.incrementAmount(2);

    expect(item.amount).toEqual(3);
    expect(item.total).toEqual(30.0);
  });
});
