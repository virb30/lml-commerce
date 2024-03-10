import { Order } from "../../domain/entity/order";
import { OrderRepository } from "../../domain/repository/order.repository.interface";
import { Id } from "@modules/shared/domain/value-object/id";

export class OrderRepositoryMemory implements OrderRepository {
  private orders: Order[] = [];

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async getById(id: Id): Promise<Order> {
    const order = this.orders.find((order) => {
      return order.id.value === id.value;
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  async clear(): Promise<void> {
    this.orders = [];
  }

  async getNextSequence(): Promise<number> {
    if (this.orders.length === 0) {
      return 1;
    }
    const sequences = this.orders.map((order) => order.sequency ?? 0);
    const maxSequence = Math.max(...sequences);
    return maxSequence + 1;
  }
}
