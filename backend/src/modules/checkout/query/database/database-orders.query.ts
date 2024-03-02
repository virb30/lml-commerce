import { Connection } from "@modules/database/connection/connection.interface";
import { Email } from "@modules/shared/domain/value-object/email";
import { FindByEmailOutput, OrdersQuery } from "../orders.query.interface";

export class DatabaseOrdersQuery implements OrdersQuery {
  constructor(private connection: Connection) {}

  async findByEmail(email: Email, page: number, limit: number): Promise<FindByEmailOutput> {
    const offset = (page - 1) * limit;

    const ordersData = await this.connection.query(
      "SELECT id, code, issue_date, total, email FROM app.order WHERE email = ? LIMIT ?, ?",
      [email.value, offset.toString(), limit.toString()],
    );

    return {
      orders: ordersData.map((orderData: any) => ({
        id: orderData.id,
        date: new Date(orderData.issue_date),
        email: orderData.email,
        total: orderData.total,
      })),
    };
  }
}
