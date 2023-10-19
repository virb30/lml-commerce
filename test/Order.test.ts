import { Id } from "../src/Domain/ValueObjects/Id";
import { Email } from "../src/Domain/ValueObjects/Email";
import { Dimensions } from "../src/Domain/ValueObjects/Dimensions";
import { Product } from "../src/Domain/Entity/Product";
import { Order } from "../src/Domain/Entity/Order";

describe("Order tests", () => {
  it("should create an order", () => {
    const order = new Order(new Id("1"), new Email("cliente@email.com"), new Date("2023-01-01"), 1);
    const product = new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0);
    order.addItem(product, 1);
    expect(order.items).toHaveLength(1);
    expect(order.total).toBe(10);
  });

  it("should create an order with two items", () => {
    const order = new Order(new Id("1"), new Email("cliente@email.com"), new Date("2023-01-01"), 1);
    order.addItem(new Product(new Id("1"), "Bicicleta", 20.0, new Dimensions(10, 10, 2), 50), 1);
    order.addItem(new Product(new Id("2"), "Pneu de trator", 30.0, new Dimensions(20, 20, 10), 20), 1);
    expect(order.items).toHaveLength(2);
    expect(order.total).toBe(50.0);
  });
});
