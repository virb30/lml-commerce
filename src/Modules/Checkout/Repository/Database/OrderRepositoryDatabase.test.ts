import { OrderRepositoryDatabase } from "./OrderRepositoryDatabase";
import { Order } from "../../Domain/Entity/Order";
import { Product } from "../../Domain/Entity/Product";
import { Id } from "../../../@shared/Domain/ValueObject/Id";
import { Email } from "../../../@shared/Domain/ValueObject/Email";
import { Dimensions } from "../../Domain/Entity/Dimensions";
import { getDbConnectionString } from "../../../../config";
import { MysqlConnectionAdapter } from "../../../../Infra/Database/MysqlConnectionAdapter";
import { Coupon } from "../../Domain/Entity/Coupon";

describe("Order repository", () => {
  const connection = new MysqlConnectionAdapter(getDbConnectionString());
  const orderRepositoryDatabase = new OrderRepositoryDatabase(connection);

  beforeEach(async () => {
    await orderRepositoryDatabase.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Should save order", async () => {
    const order = new Order(new Id("1"), new Email("cliente@email.com"), new Date("2023-01-01T00:00:00"), 1);
    order.addItem(new Product(new Id("1"), "Bicicleta", 20.0, new Dimensions(10, 10, 2), 50), 1);
    await orderRepositoryDatabase.save(order);
    const orderData = await orderRepositoryDatabase.getById(new Id("1"));
    expect(orderData).toEqual(order);
  });

  it("should save order and coupon", async () => {
    const order = new Order(new Id("1"), new Email("cliente@email.com"), new Date("2023-01-01T00:00:00"), 1);
    const product = new Product(new Id("1"), "Bicicleta", 20.0, new Dimensions(10, 10, 2), 50);
    const coupon = new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-31T23:59:59"));
    order.addItem(product, 2);
    order.applyCoupon(coupon);
    await orderRepositoryDatabase.save(order);
    const orderData = await orderRepositoryDatabase.getById(new Id("1"));
    expect(orderData).toEqual(order);
  });

  it("should throw an error if order not found", async () => {
    expect(async () => {
      await orderRepositoryDatabase.getById(new Id("1"));
    }).rejects.toThrow(new Error("Order not found"));
  });
});
