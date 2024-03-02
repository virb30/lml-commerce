import { Order } from "../../domain/entity/order";
import { OrderRepository } from "../../domain/repository/order.repository.interface";
import { Id } from "@modules/shared/domain/value-object/id";

export class OrderRepositoryMemory implements OrderRepository {
  private orders: Order[] = [];

  public async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  public async getById(id: Id): Promise<Order> {
    const order = this.orders.find((order) => {
      return order.id.value === id.value;
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  public async clear(): Promise<void> {
    this.orders = [];
  }
}
