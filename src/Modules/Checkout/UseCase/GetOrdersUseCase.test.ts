import { Email } from "../../@shared/Domain/ValueObject/Email";
import { Id } from "../../@shared/Domain/ValueObject/Id";
import { Order } from "../Domain/Entity/Order";
import { GetOrdersUseCase } from "./GetOrdersUseCase";
import { MemoryOrdersQuery } from "../Query/MemoryOrdersQuery";
import { OrdersQuery } from "../Query/OrdersQuery";

const createOrder = (id: string, email: string, date: Date, total: number) => {
  const order = new Order(new Id(id), new Email(email), date, total);
  return order;
};

describe("GetOrdersUseCase tests", () => {
  let ordersGateway: OrdersQuery;

  const ordersData = [
    createOrder("1", "email@1234.com", new Date("2023-01-01T00:00:00"), 1),
    createOrder("2", "email@1234.com", new Date("2023-02-02T00:00:00"), 2),
    createOrder("3", "email@1234.com", new Date("2023-03-03T00:00:00"), 3),
    createOrder("4", "email@1234.com", new Date("2023-04-04T00:00:00"), 4),
    createOrder("5", "email@1234.com", new Date("2023-05-05T00:00:00"), 5),
  ];

  beforeEach(() => {
    ordersGateway = new MemoryOrdersQuery(ordersData);
  });

  it.each([
    { page: 1, limit: 2, expected: ordersData.slice(0, 2) },
    { page: 2, limit: 2, expected: ordersData.slice(2, 4) },
    { page: 3, limit: 2, expected: ordersData.slice(4, 5) },
  ])("returns orders for page $page and limit $limit", async ({ page, limit, expected }) => {
    const getOrdersUseCase = new GetOrdersUseCase(ordersGateway);

    const ordersPage1 = await getOrdersUseCase.execute({
      email: "email@1234.com",
      page: page,
      limit: limit,
    });

    expect(ordersPage1.length).toBe(expected.length);
    expect(ordersPage1).toEqual(
      expected.map((order) => {
        return {
          code: order.code.value,
          total: order.total,
          date: order.date,
        };
      }),
    );
  });

  it("should return message to an email without requests", async () => {
    const getOrdersUseCase = new GetOrdersUseCase(ordersGateway);
    expect(async () => {
      await getOrdersUseCase.execute({
        email: "wrong@email.com",
        page: 1,
        limit: 5,
      });
    }).rejects.toThrow(new Error("No orders found for it email"));
  });

  it("It should not return results to an invalid page", async () => {
    const getOrdersUseCase = new GetOrdersUseCase(ordersGateway);
    expect(async () => {
      await getOrdersUseCase.execute({
        email: "email@1234.com",
        page: 2,
        limit: 5,
      });
    }).rejects.toThrow(new Error("No orders found for it email"));
  });
});
