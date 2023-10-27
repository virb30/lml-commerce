import { Order } from "../../Domain/Entity/Order";
import { OrderItem } from "../../Domain/Entity/OrderItem";
import { OrderRepository } from "../../Domain/Repository/OrderRepository";
import { Email } from "../../Domain/ValueObjects/Email";
import { Id } from "../../Domain/ValueObjects/Id";
import { Connection } from "../Database/Connection";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(private connection: Connection) {}

  public async getById(id: Id): Promise<Order> {
    const [orderData] = await this.connection.query("SELECT * FROM app.order WHERE id = ?", [id.value]);

    const order = new Order(
      new Id(orderData.id),
      new Email(orderData.email),
      new Date(orderData.issue_date),
      orderData.sequency,
    );

    order.freight.total = parseFloat(orderData.freight);

    const orderItemsData = await this.connection.query("SELECT * FROM app.order_item WHERE id_order = ?", [
      order.id.value,
    ]);

    order.items = orderItemsData.map((orderItem: any) => {
      return new OrderItem(new Id(orderItem.id_product), parseFloat(orderItem.price), parseInt(orderItem.amount));
    });

    return order;
  }

  public async save(order: Order): Promise<void> {
    await this.connection.query(
      "INSERT INTO app.order (id, email, code, sequency, total, issue_date, freight) VALUES (?,?,?,?,?,?,?)",
      [
        order.id.value,
        order.email.value,
        order.code.value,
        order.sequency,
        order.total,
        order.date,
        order.getFreight(),
      ],
    );

    for (const orderItem of order.items) {
      await this.connection.query("INSERT INTO app.order_item (id_order, id_product, price, amount) VALUES (?,?,?,?)", [
        order.id.value,
        orderItem.productId.value,
        orderItem.price,
        orderItem.amount,
      ]);
    }
  }

  public async clear(): Promise<void> {
    await this.connection.query("DELETE FROM app.order_item", []);
    await this.connection.query("DELETE FROM app.order", []);
  }
}
