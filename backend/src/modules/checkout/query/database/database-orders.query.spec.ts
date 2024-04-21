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
  let ordersData: Order[];

  const ordersFixture = async () => {
    const order1 = Order.create({
      email: new Email("valid@email.com"),
      date: new Date("2023-01-01T10:03:00"),
      sequence: 1,
    });
    const order2 = Order.create({
      email: new Email("valid@email.com"),
      date: new Date("2023-01-01T10:02:00"),
      sequence: 2,
    });
    const order3 = Order.create({
      email: new Email("valid@email.com"),
      date: new Date("2023-01-01T10:01:00"),
      sequence: 3,
    });
    const order4 = Order.create({
      email: new Email("other@email.com"),
      date: new Date("2023-01-01T10:00:00"),
      sequence: 4,
    });
    await orderRepository.save(order1);
    await orderRepository.save(order2);
    await orderRepository.save(order3);
    await orderRepository.save(order4);
    ordersData = [order1, order2, order3, order4];
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
    expect(orders[0].id).toEqual(ordersData[0].id.value);
    expect(orders[1].id).toEqual(ordersData[1].id.value);
    expect(orders[2].id).toEqual(ordersData[2].id.value);
  });

  it("returns all orders of email paginated", async () => {
    const { orders: ordersPage1 } = await ordersGateway.findByEmail(new Email("valid@email.com"), 1, 2);
    expect(ordersPage1).toHaveLength(2);
    expect(ordersPage1[0].id).toEqual(ordersData[0].id.value);
    expect(ordersPage1[1].id).toEqual(ordersData[1].id.value);

    const { orders: ordersPage2 } = await ordersGateway.findByEmail(new Email("valid@email.com"), 2, 2);
    expect(ordersPage2).toHaveLength(1);
    expect(ordersPage2[0].id).toEqual(ordersData[2].id.value);
  });
});
