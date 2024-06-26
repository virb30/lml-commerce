import { Email } from "@modules/shared/domain/value-object/email";
import { OrderDTO, OrdersQuery } from "../query/orders.query.interface";
import { NotFoundError } from "@modules/shared/errors/not-found.error";

export class ListOrdersUseCase {
  constructor(private ordersGateway: OrdersQuery) {}

  public async execute(input: GetOrdersInput): Promise<GetOrdersOutput[]> {
    const { orders } = await this.ordersGateway.findByEmail(new Email(input.email), input.page, input.limit);

    if (!orders.length) {
      throw new NotFoundError("No orders found for it email");
    }

    return orders.map((order: OrderDTO) => ({
      code: order.code,
      total: order.total,
      date: order.date,
    }));
  }
}

type GetOrdersInput = {
  email: string;
  page: number;
  limit: number;
};

type GetOrdersOutput = {
  code: string;
  total: number;
  date: Date;
};
