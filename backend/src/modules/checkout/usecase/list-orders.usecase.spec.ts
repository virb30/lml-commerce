import { Email } from "@modules/shared/domain/value-object/email";
import { Id } from "@modules/shared/domain/value-object/id";
import { Order } from "../domain/entity/order";
import { ListOrdersUseCase } from "./list-orders.usecase";
import { MemoryOrdersQuery } from "../query/memory/memory-orders.query";
import { OrderDTO, OrdersQuery } from "../query/orders.query.interface";
import { NotFoundError } from "@modules/shared/errors/not-found.error";

const createOrder = (id: string, code: string, email: string, date: Date, total: number) => {
  const order: OrderDTO = { id, code, email, date, total };
  return order;
};

describe("ListOrdersUseCase tests", () => {
  let ordersGateway: OrdersQuery;

  const ordersData = [
    createOrder("1", "202300000001", "email@1234.com", new Date("2023-01-01T00:00:00"), 1),
    createOrder("2", "202300000002", "email@1234.com", new Date("2023-02-02T00:00:00"), 2),
    createOrder("3", "202300000003", "email@1234.com", new Date("2023-03-03T00:00:00"), 3),
    createOrder("4", "202300000004", "email@1234.com", new Date("2023-04-04T00:00:00"), 4),
    createOrder("5", "202300000005", "email@1234.com", new Date("2023-05-05T00:00:00"), 5),
  ];

  beforeEach(() => {
    ordersGateway = new MemoryOrdersQuery(ordersData);
  });

  it.each([
    { page: 1, limit: 2, expected: ordersData.slice(0, 2) },
    { page: 2, limit: 2, expected: ordersData.slice(2, 4) },
    { page: 3, limit: 2, expected: ordersData.slice(4, 5) },
  ])("returns orders for page $page and limit $limit", async ({ page, limit, expected }) => {
    const getOrdersUseCase = new ListOrdersUseCase(ordersGateway);

    const ordersPage1 = await getOrdersUseCase.execute({
      email: "email@1234.com",
      page: page,
      limit: limit,
    });

    expect(ordersPage1.length).toBe(expected.length);
    expect(ordersPage1).toEqual(
      expected.map((order) => {
        return {
          code: order.code,
          total: order.total,
          date: order.date,
        };
      }),
    );
  });

  it("throws error if email has no orders", async () => {
    const getOrdersUseCase = new ListOrdersUseCase(ordersGateway);
    expect(async () => {
      await getOrdersUseCase.execute({
        email: "wrong@email.com",
        page: 1,
        limit: 5,
      });
    }).rejects.toThrowErrorTypeWithMessage(NotFoundError, "No orders found for it email");
  });

  it("throws an error if invalid page provided", async () => {
    const getOrdersUseCase = new ListOrdersUseCase(ordersGateway);
    expect(async () => {
      await getOrdersUseCase.execute({
        email: "email@1234.com",
        page: 2,
        limit: 5,
      });
    }).rejects.toThrowErrorTypeWithMessage(NotFoundError, "No orders found for it email");
  });
});
