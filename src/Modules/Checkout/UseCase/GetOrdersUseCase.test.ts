import { Email } from "../../@shared/Domain/ValueObject/Email";
import { Id } from "../../@shared/Domain/ValueObject/Id";
import { MysqlConnectionAdapter } from "../../../Infra/Database/MysqlConnectionAdapter";
import { OrderRepositoryDatabase } from "../Repository/Database/OrderRepositoryDatabase";
import { Order } from "../Domain/Entity/Order";
import { Product } from "../Domain/Entity/Product";
import { Dimensions } from "../Domain/Entity/Dimensions";
import { OrderCode } from "../Domain/ValueObject/OrderCode";
import { GetOrdersUseCase } from "./GetOrdersUseCase";
import { db } from "../../../Infra/Config";

describe("GetOrdersUseCase tests", () => {
  const connection = new MysqlConnectionAdapter(db.getConnectionString());
  let orderRepository: OrderRepositoryDatabase;

  beforeAll(() => {
    orderRepository = new OrderRepositoryDatabase(connection);
  });

  beforeEach(async () => {
    await orderRepository.clear();
  });

  afterAll(async () => {
    await orderRepository.clear();
    await connection.close();
  });

  const createOrder = (id: string, email: string, date: string, total: number) => {
    const order = new Order(new Id(id), new Email(email), new Date(date), total);
    const orderCode = new OrderCode(new Date(date), parseInt(id));
    return { order, code: orderCode.value };
  };

  const saveOrders = async (orders: any[]) => {
    for (const orderData of orders) {
      await orderRepository.save(orderData.order);
    }
  };

  const ordersData = [
    createOrder("1", "email@1234.com", "2023-01-01T00:00:00", 1),
    createOrder("2", "email@1234.com", "2023-02-02T00:00:00", 2),
    createOrder("3", "email@1234.com", "2023-03-03T00:00:00", 3),
    createOrder("4", "email@1234.com", "2023-04-04T00:00:00", 4),
    createOrder("5", "email@1234.com", "2023-05-05T00:00:00", 5),
  ];

  it.each([
    [1, 2, ordersData.slice(0, 2)],
    [2, 2, ordersData.slice(2, 4)],
    [3, 2, ordersData.slice(4, 5)],
  ])("should return the correct orders for page %i and limit %i", async (page, limit, dataPagination) => {
    await saveOrders(ordersData);
    const getOrdersUseCase = new GetOrdersUseCase(orderRepository);

    const ordersPage1 = await getOrdersUseCase.execute({
      email: "email@1234.com",
      page: page,
      limit: limit,
    });

    expect(ordersPage1.length).toBe(dataPagination.length);
    expect(ordersPage1).toEqual(
      dataPagination.map((orderData) => {
        return {
          code: orderData.code,
          total: orderData.order.total,
          date: orderData.order.date,
        };
      }),
    );
  });

  it("should return message to an email without requests", async () => {
    const getOrdersUseCase = new GetOrdersUseCase(orderRepository);
    expect(async () => {
      await getOrdersUseCase.execute({
        email: "email@1234.com",
        page: 1,
        limit: 5,
      });
    }).rejects.toThrow(new Error("No orders found for it email"));
  });

  it("It should not return results to an invalid page", async () => {
    await saveOrders(ordersData);
    const getOrdersUseCase = new GetOrdersUseCase(orderRepository);
    expect(async () => {
      await getOrdersUseCase.execute({
        email: "email@1234.com",
        page: 2,
        limit: 5,
      });
    }).rejects.toThrow(new Error("No orders found for it email"));
  });
});
