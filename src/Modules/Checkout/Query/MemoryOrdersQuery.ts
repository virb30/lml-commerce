import { Email } from "../../@shared/Domain/ValueObject/Email";
import { Order } from "../Domain/Entity/Order";
import { FindByEmailOutput, OrdersQuery, OrderDTO } from "./OrdersQuery";

export class MemoryOrdersQuery implements OrdersQuery {
  private orders: OrderDTO[] = [];

  constructor(orders: Order[]) {
    this.orders = orders.map((order) => ({
      id: order.id.value,
      code: order.code.value,
      date: order.date,
      email: order.email.value,
      total: order.total,
    }));
  }

  async findByEmail(email: Email, page: number, limit: number): Promise<FindByEmailOutput> {
    const filteredOrders = this.orders.filter((order) => {
      return order.email === email.value;
    });

    return {
      orders: filteredOrders.slice((page - 1) * limit, limit * page),
    };
  }
}
