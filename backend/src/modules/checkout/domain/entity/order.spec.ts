import { Id } from "@modules/shared/domain/value-object/id";
import { Email } from "@modules/shared/domain/value-object/email";
import { Dimensions } from "../value-object/dimensions";
import { Product } from "./product";
import { Order } from "./order";
import { Coupon } from "./coupon";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { OrderItem } from "./order-item";
import { OrderCoupon } from "./order-coupon";

describe("Order tests", () => {
  it("should create an order", () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    const product = new Product(new Id("1"), "Fone de ouvido", new BRLCurrency(10.0), new Dimensions(10, 20, 30), 0);
    order.addItem(product, 1);
    expect(order.items).toHaveLength(1);
    expect(order.total).toBe(10);
    expect(order.code.value).toEqual("202300000001");
  });

  it("should create an order with two items", () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    order.addItem(new Product(new Id("1"), "Bicicleta (digital)", new BRLCurrency(20.0)), 1);
    order.addItem(new Product(new Id("2"), "Pneu de trator (digital)", new BRLCurrency(30.0)), 1);
    expect(order.items).toHaveLength(2);
    expect(order.total).toBe(50.0);
    expect(order.code.value).toEqual("202300000001");
  });

  it("should increment amount on duplicated items", async () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    const product1 = new Product(new Id("1"), "Bicicleta (Digital)", new BRLCurrency(20.0));
    const product2 = new Product(new Id("2"), "Fone de ouvido (Digital)", new BRLCurrency(5.0));

    order.addItem(product1, 1);
    order.addItem(product2, 1);
    order.addItem(product1, 1);

    expect(order.items).toHaveLength(2);
    expect(order.total).toBe(45.0);
  });

  it("should create an order and change freight", () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    const product1 = new Product(new Id("1"), "Bicicleta", new BRLCurrency(20.0), new Dimensions(10, 10, 2), 50);
    const product2 = new Product(new Id("2"), "Pneu de trator", new BRLCurrency(30.0), new Dimensions(20, 20, 10), 20);
    order.addItem(product1, 1);
    order.addItem(product1, 1);
    order.addItem(product2, 1);
    order.changeFreight(1200);
    expect(order.items).toHaveLength(2);
    expect(order.freight).toBe(1200);
    expect(order.total).toBe(1270);
    expect(order.code.value).toEqual("202300000001");
  });

  it("should create an order with two items, change freight and apply coupon", () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    const product1 = new Product(new Id("1"), "Bicicleta", new BRLCurrency(20.0), new Dimensions(10, 10, 2), 50);
    const product2 = new Product(new Id("2"), "Pneu de trator", new BRLCurrency(30.0), new Dimensions(20, 20, 10), 20);
    const coupon = new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-01T00:00:00"));
    order.addItem(product1, 2);
    order.addItem(product2, 1);
    order.applyCoupon(coupon);
    order.changeFreight(1200);
    expect(order.coupon?.code).toEqual("VALE10");
    expect(order.items).toHaveLength(2);
    expect(order.total).toBe(1263);
    expect(order.code.value).toEqual("202300000001");
  });

  it("should create an order and apply expired coupon", () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    const product1 = new Product(new Id("1"), "Bicicleta", new BRLCurrency(20.0), new Dimensions(10, 10, 2), 50);
    const product2 = new Product(new Id("2"), "Pneu de trator", new BRLCurrency(30.0), new Dimensions(20, 20, 10), 20);
    const coupon = new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2022-12-31T23:59:59"));
    order.addItem(product1, 2);
    order.addItem(product2, 1);
    order.applyCoupon(coupon);
    expect(order.coupon).toBeUndefined();
    expect(order.items).toHaveLength(2);
    expect(order.total).toBe(70);
    expect(order.code.value).toEqual("202300000001");
  });

  it("should restore an order", () => {
    const items = [
      new OrderItem(new Id("1"), new BRLCurrency(1000), 1),
      new OrderItem(new Id("2"), new BRLCurrency(10), 2),
    ];
    const coupon = new OrderCoupon("VALE10", 10, 0);
    const order = Order.restore({
      id: new Id("1"),
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 10,
      items,
      freight: 100,
      coupon,
    });
    expect(order.code.value).toEqual("202300000010");
    expect(order.id.value).toBe("1");
    expect(order.email.value).toBe("cliente@email.com");
    expect(order.date).toEqual(new Date("2023-01-01T00:00:00"));
    expect(order.items).toHaveLength(2);
    expect(order.total).toBe(1018);
    expect(order.freight).toBe(100);
    expect(order.coupon.code).toBe("VALE10");
    expect(order.coupon.discountLimit).toBe(0);
    expect(order.coupon.percentage).toBe(10);
  });
});
