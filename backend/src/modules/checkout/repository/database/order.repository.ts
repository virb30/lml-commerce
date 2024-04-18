import { Order } from "../../domain/entity/order";
import { OrderCoupon } from "../../domain/entity/order-coupon";
import { OrderItem } from "../../domain/entity/order-item";
import { OrderRepository } from "../../domain/repository/order.repository.interface";
import { Email } from "@modules/shared/domain/value-object/email";
import { Id } from "@modules/shared/domain/value-object/id";
import { Connection } from "../../../database/connection/connection.interface";
import { CurrencyFactory } from "@modules/shared/domain/value-object/currency/currency.factory";
import { NotFoundError } from "@modules/shared/errors/not-found.error";

export class OrderRepositoryDatabase implements OrderRepository {
  constructor(private connection: Connection) {}

  async getById(id: Id): Promise<Order> {
    const [orderData] = await this.connection.query("SELECT * FROM app.order WHERE id = ?", [id.value]);

    if (!orderData) {
      throw new NotFoundError("Order not found");
    }

    const order = new Order(
      new Id(orderData.id),
      new Email(orderData.email),
      new Date(orderData.issue_date),
      orderData.sequency,
    );

    if (orderData.coupon_code) {
      order.coupon = new OrderCoupon(
        orderData.coupon_code,
        parseFloat(orderData.coupon_percentage),
        parseFloat(orderData.coupon_discount_limit),
      );
    }

    order.freight.total = parseFloat(orderData.freight);

    const orderItemsData = await this.connection.query(
      "SELECT id_product, currency, price, amount FROM app.order_item WHERE id_order = ?",
      [order.id.value],
    );

    order.items = orderItemsData.map((orderItem: any) => {
      return new OrderItem(
        new Id(orderItem.id_product),
        CurrencyFactory.make(parseFloat(orderItem.price), orderItem.currency),
        parseInt(orderItem.amount),
      );
    });

    return order;
  }

  async save(order: Order): Promise<void> {
    await this.connection.query(
      "INSERT INTO app.order (id, email, code, sequency, total, currency, issue_date, freight, coupon_code, coupon_percentage, coupon_discount_limit) VALUES (?,?,?,?,?,?,?,?,?,?,?)",
      [
        order.id.value,
        order.email.value,
        order.code.value,
        order.sequency,
        order.total,
        order.currency,
        order.date,
        order.getFreight(),
        order.coupon?.code ?? null,
        order.coupon?.percentage ?? null,
        order.coupon?.discountLimit ?? null,
      ],
    );

    for (const orderItem of order.items) {
      await this.connection.query(
        "INSERT INTO app.order_item (id_order, id_product, price, currency, amount) VALUES (?,?,?,?,?)",
        [order.id.value, orderItem.productId.value, orderItem.price.value, orderItem.price.code, orderItem.amount],
      );
    }
  }

  async getNextSequence(): Promise<number> {
    let maxSequence = 0;
    const [sequenceData] = await this.connection.query("SELECT MAX(sequency) AS sequence FROM app.order", []);
    if (sequenceData?.sequence) {
      maxSequence = parseInt(sequenceData.sequence);
    }
    return maxSequence + 1;
  }

  async clear(): Promise<void> {
    await this.connection.query("DELETE FROM app.order_item", []);
    await this.connection.query("DELETE FROM app.order", []);
  }
}
