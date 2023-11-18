import { Order } from "../../Domain/Checkout/Entity/Order";
import { OrderRepository } from "../../Domain/Checkout/Repository/OrderRepository";
import { Id } from "../../Domain/@shared/ValueObject/Id";

export class GetOrderUseCase {
  public constructor(private OrderRepository: OrderRepository) { }

  public async execute(input: GetOrderInput): Promise<Order> {
    return await this.OrderRepository.getById(new Id(input.id));
  }
}

type GetOrderInput = {
  id: string;
};
