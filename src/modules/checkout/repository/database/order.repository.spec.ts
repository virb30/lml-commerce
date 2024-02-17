import { OrderRepositoryDatabase } from "./order.repository";
import { Order } from "../../domain/entity/order";
import { Product } from "../../domain/entity/product";
import { Id } from "src/modules/shared/domain/value-object/id";
import { Email } from "src/modules/shared/domain/value-object/email";
import { Dimensions } from "../../domain/value-object/dimensions";
import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { Coupon } from "../../domain/entity/coupon";
import { dbConfig } from "src/modules/database/connection/mysql/config";

describe("Order repository", () => {
  const connection = new MysqlConnectionAdapter(dbConfig);
  const orderRepositoryDatabase = new OrderRepositoryDatabase(connection);

  beforeEach(async () => {
    await orderRepositoryDatabase.clear();
  });

  afterAll(async () => {
    await orderRepositoryDatabase.clear();
    await connection.close();
  });

  it("saves an order", async () => {
    const order = new Order(new Id("1"), new Email("cliente@email.com"), new Date("2023-01-01T00:00:00"), 1);
    order.addItem(new Product(new Id("1"), "Bicicleta", 20.0, new Dimensions(10, 10, 2), 50), 1);
    await orderRepositoryDatabase.save(order);
    const orderData = await orderRepositoryDatabase.getById(new Id("1"));
    expect(orderData).toEqual(order);
  });

  it("saves an order and coupon", async () => {
    const order = new Order(new Id("1"), new Email("cliente@email.com"), new Date("2023-01-01T00:00:00"), 1);
    const product = new Product(new Id("1"), "Bicicleta", 20.0, new Dimensions(10, 10, 2), 50);
    const coupon = new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-31T23:59:59"));
    order.addItem(product, 2);
    order.applyCoupon(coupon);
    await orderRepositoryDatabase.save(order);
    const orderData = await orderRepositoryDatabase.getById(new Id("1"));
    expect(orderData).toEqual(order);
  });

  it("throws an error if order not found", async () => {
    expect(async () => {
      await orderRepositoryDatabase.getById(new Id("1"));
    }).rejects.toThrow(new Error("Order not found"));
  });
});
