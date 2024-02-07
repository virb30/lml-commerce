import { Order } from "../domain/entity/order";
import { OrderRepository } from "../domain/repository/order.repository.interface";
import { Id } from "../../shared/domain/value-object/id";

export class GetOrderUseCase {
  public constructor(private orderRepository: OrderRepository) {}

  public async execute(input: GetOrderInput): Promise<Order> {
    return await this.orderRepository.getById(new Id(input.id));
  }
}

type GetOrderInput = {
  id: string;
};
