import { Order } from "../../Domain/Entity/Order";
import { OrderRepository } from "../../Domain/Repository/OrderRepository";
import { Id } from "../../../@shared/Domain/ValueObject/Id";
import { Email } from "../../../@shared/Domain/ValueObject/Email";

export class OrderRepositoryMemory implements OrderRepository {
  public async findByEmail(email: Email, page: number, limit: number): Promise<any> {
    const order = this.orders.filter((order) => {
      return order.email.value === email.value;
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return order.slice((page - 1) * limit, limit * page);
  }

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
