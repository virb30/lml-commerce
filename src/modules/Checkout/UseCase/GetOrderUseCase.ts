import { Order } from "../Domain/Entity/Order";
import { OrderRepository } from "../Domain/Repository/OrderRepository";
import { Id } from "../../../Domain/@shared/ValueObject/Id";

export class GetOrderUseCase {
  public constructor(private orderRepository: OrderRepository) {}

  public async execute(input: GetOrderInput): Promise<Order> {
    return await this.orderRepository.getById(new Id(input.id));
  }
}

type GetOrderInput = {
  id: string;
};
