import { Email } from "../../@shared/Domain/ValueObject/Email";
import { Order } from "../Domain/Entity/Order";
import { OrderRepository } from "../Domain/Repository/OrderRepository";

export class GetOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  public async execute(input: GetOrdersInput): Promise<GetOrdersOutput[]> {
    const orders = await this.orderRepository.findByEmail(new Email(input.email), input.page, input.limit);

    if (!orders.length) {
      throw new Error("No orders found for it email");
    }

    return orders.map((node: Order) => {
      return {
        code: node.code.value,
        total: node.total,
        date: node.date,
      };
    });
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
