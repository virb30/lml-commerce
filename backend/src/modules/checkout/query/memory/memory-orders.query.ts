import { Email } from "@modules/shared/domain/value-object/email";
import { Order } from "../../domain/entity/order";
import { FindByEmailOutput, OrdersQuery, OrderDTO } from "../orders.query.interface";

export class MemoryOrdersQuery implements OrdersQuery {
  private orders: OrderDTO[];

  constructor(orders: OrderDTO[] = []) {
    this.orders = orders.map((order) => ({
      id: order.id,
      code: order.code,
      date: order.date,
      email: order.email,
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
