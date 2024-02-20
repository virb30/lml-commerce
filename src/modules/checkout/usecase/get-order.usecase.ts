import { Order } from "../domain/entity/order";
import { OrderRepository } from "../domain/repository/order.repository.interface";
import { Id } from "../../shared/domain/value-object/id";
import { RepositoryFactory } from "../domain/factory/repository-factory.interface";

export class GetOrderUseCase {
  private orderRepository: OrderRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.makeOrderRepository();
  }

  async execute(input: GetOrderInput): Promise<Order> {
    return await this.orderRepository.getById(new Id(input.id));
  }
}

type GetOrderInput = {
  id: string;
};
