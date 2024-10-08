import { OrderRepositoryDatabase } from "./order.repository";
import { Order } from "../../domain/entity/order";
import { Product } from "../../domain/entity/product";
import { Id } from "@modules/shared/domain/value-object/id";
import { Email } from "@modules/shared/domain/value-object/email";
import { Dimensions } from "../../domain/value-object/dimensions";
import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { Coupon } from "../../domain/entity/coupon";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { CurrencyFactory } from "@modules/shared/domain/value-object/currency/currency.factory";
import { NotFoundError } from "@modules/shared/errors/not-found.error";
import { initDb } from "@test/initDb";

describe("Order repository", () => {
  const db = initDb(MysqlConnectionAdapter);
  let orderRepositoryDatabase: OrderRepositoryDatabase;

  beforeAll(() => {
    orderRepositoryDatabase = new OrderRepositoryDatabase(db.connection);
    const factory = CurrencyFactory.getInstance();
    factory.register("brl", BRLCurrency);
  });

  beforeEach(async () => {
    await orderRepositoryDatabase.clear();
  });

  it("saves an order", async () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    order.addItem(new Product(new Id("1"), "Bicicleta", new BRLCurrency(20.0), new Dimensions(10, 10, 2), 50), 1);
    await orderRepositoryDatabase.save(order);
    const orderData = await orderRepositoryDatabase.getById(order.id);
    expect(orderData).toEqual(order);
  });

  it("saves an order and coupon", async () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    const product = new Product(new Id("1"), "Bicicleta", new BRLCurrency(20.0), new Dimensions(10, 10, 2), 50);
    const coupon = new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-31T23:59:59"));
    order.addItem(product, 2);
    order.applyCoupon(coupon);
    await orderRepositoryDatabase.save(order);
    const orderData = await orderRepositoryDatabase.getById(order.id);
    expect(orderData).toEqual(order);
  });

  it("throws an error if order not found", async () => {
    await expect(orderRepositoryDatabase.getById(new Id("1"))).rejects.toThrowErrorTypeWithMessage(
      NotFoundError,
      "Order not found",
    );
  });

  it("gets next sequence if there is no order placed", async () => {
    const nextSequence = await orderRepositoryDatabase.getNextSequence();
    expect(nextSequence).toBe(1);
  });

  it("gets next sequence if there is an order placed", async () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    order.addItem(new Product(new Id("1"), "Bicicleta", new BRLCurrency(20.0), new Dimensions(10, 10, 2), 50), 1);
    await orderRepositoryDatabase.save(order);

    const nextSequence = await orderRepositoryDatabase.getNextSequence();
    expect(nextSequence).toBe(2);
  });
});
