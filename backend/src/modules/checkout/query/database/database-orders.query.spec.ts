import { MysqlConnectionAdapter } from "@modules/database/connection/mysql/mysql-connection.adapter";
import { Email } from "@modules/shared/domain/value-object/email";
import { Id } from "@modules/shared/domain/value-object/id";
import { Order } from "../../domain/entity/order";
import { OrderRepositoryDatabase } from "../../repository/database/order.repository";
import { DatabaseOrdersQuery } from "./database-orders.query";
import { dbConfig } from "@modules/database/connection/mysql/config";

describe("DatabaseOrdersQuery tests", () => {
  const connection = new MysqlConnectionAdapter(dbConfig);
  const orderRepository = new OrderRepositoryDatabase(connection);
  const ordersGateway = new DatabaseOrdersQuery(connection);

  const ordersFixture = async () => {
    const order1 = new Order(new Id("1"), new Email("valid@email.com"), new Date("2023-01-01T10:00:00"), 1);
    const order2 = new Order(new Id("2"), new Email("valid@email.com"), new Date("2023-01-01T10:00:00"), 2);
    const order3 = new Order(new Id("3"), new Email("valid@email.com"), new Date("2023-01-01T10:00:00"), 3);
    const order4 = new Order(new Id("4"), new Email("other@email.com"), new Date("2023-01-01T10:00:00"), 2);
    await orderRepository.save(order1);
    await orderRepository.save(order2);
    await orderRepository.save(order3);
    await orderRepository.save(order4);
  };

  beforeEach(async () => {
    await orderRepository.clear();
    await ordersFixture();
  });

  afterAll(async () => {
    await orderRepository.clear();
    await connection.close();
  });

  it("returns empty list", async () => {
    const { orders } = await ordersGateway.findByEmail(new Email("no-orders@email.com"), 1, 10);
    expect(orders).toHaveLength(0);
  });

  it("returns all orders of email", async () => {
    const { orders } = await ordersGateway.findByEmail(new Email("valid@email.com"), 1, 10);
    expect(orders).toHaveLength(3);
    expect(orders[0].id).toEqual("1");
    expect(orders[1].id).toEqual("2");
    expect(orders[2].id).toEqual("3");
  });

  it("returns all orders of email paginated", async () => {
    const { orders: ordersPage1 } = await ordersGateway.findByEmail(new Email("valid@email.com"), 1, 2);
    expect(ordersPage1).toHaveLength(2);
    expect(ordersPage1[0].id).toEqual("1");
    expect(ordersPage1[1].id).toEqual("2");

    const { orders: ordersPage2 } = await ordersGateway.findByEmail(new Email("valid@email.com"), 2, 2);
    expect(ordersPage2).toHaveLength(1);
    expect(ordersPage2[0].id).toEqual("3");
  });
});
