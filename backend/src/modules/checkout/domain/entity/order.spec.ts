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
    const product = Product.create({
      name: "Fone de ouvido",
      price: new BRLCurrency(10.0),
      dimensions: new Dimensions(10, 20, 30),
      weight: 0,
    });
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
    order.addItem(
      Product.create({
        name: "Bicicleta (digital)",
        price: new BRLCurrency(20.0),
      }),
      1,
    );
    order.addItem(
      Product.create({
        name: "Pneu de trator (digital)",
        price: new BRLCurrency(30.0),
      }),
      1,
    );
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
    const product1 = Product.create({
      name: "Bicicleta (Digital)",
      price: new BRLCurrency(20.0),
    });
    order.addItem(product1, 1);
    order.addItem(product1, 1);
    expect(order.items).toHaveLength(1);
    expect(order.items[0].amount).toBe(2);
    expect(order.total).toBe(40.0);
  });

  it("should create an order and change freight", () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    order.addItem(
      Product.create({
        name: "Bicicleta",
        price: new BRLCurrency(20.0),
        dimensions: new Dimensions(10, 10, 2),
        weight: 50,
      }),
      1,
    );
    order.changeFreight(1200);
    expect(order.items).toHaveLength(1);
    expect(order.freight).toBe(1200);
    expect(order.total).toBe(1220);
    expect(order.code.value).toEqual("202300000001");
  });

  it("should create an order with one item, change freight and apply coupon", () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    const coupon = Coupon.create({
      code: "VALE10",
      percentage: 10,
      discountLimit: 10.0,
      expirationDate: new Date("2023-12-01T00:00:00"),
    });

    order.addItem(
      Product.create({
        name: "Bicicleta",
        price: new BRLCurrency(20.0),
        dimensions: new Dimensions(10, 10, 2),
        weight: 50,
      }),
      1,
    );
    order.applyCoupon(coupon);
    order.changeFreight(1200);
    expect(order.coupon?.code).toEqual("VALE10");
    expect(order.items).toHaveLength(1);
    expect(order.total).toBe(1218);
    expect(order.code.value).toEqual("202300000001");
  });

  it("should create an order and apply expired coupon", () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    const coupon = Coupon.create({
      code: "VALE10",
      percentage: 10,
      discountLimit: 10.0,
      expirationDate: new Date("2022-12-31T23:59:59"),
    });
    order.addItem(
      Product.create({
        name: "Bicicleta",
        price: new BRLCurrency(20.0),
        dimensions: new Dimensions(10, 10, 2),
        weight: 50,
      }),
      1,
    );
    order.applyCoupon(coupon);
    expect(order.coupon).toBeUndefined();
    expect(order.items).toHaveLength(1);
    expect(order.total).toBe(20);
    expect(order.code.value).toEqual("202300000001");
  });

  it("should restore an order", () => {
    const items = [
      OrderItem.create({
        price: new BRLCurrency(1000),
        amount: 1,
      }),
      OrderItem.create({
        price: new BRLCurrency(10),
        amount: 2,
      }),
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
