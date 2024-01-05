import { Order } from "../../Domain/Checkout/Entity/Order";
import { OrderRepository } from "../../Domain/Checkout/Repository/OrderRepository";
import { Id } from "../../Domain/@shared/ValueObject/Id";

export class GetOrderUseCase {
  public constructor(private orderRepository: OrderRepository) {}

  public async execute(input: GetOrderInput): Promise<Order> {
    return await this.orderRepository.getById(new Id(input.id));
  }
}

type GetOrderInput = {
  id: string;
};
