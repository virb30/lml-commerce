import { Currency } from "@modules/shared/domain/value-object/currency/currency";
import { Id } from "@modules/shared/domain/value-object/id";

type OrderItemProps = {
  productId: Id;
  price: Currency;
  amount: number;
};

export type OrderItemCreateProps = Omit<OrderItemProps, "productId">;
export type OrderItemRestoreProps = OrderItemProps;

export class OrderItem {
  public productId: Id;
  public price: Currency;
  public amount: number;

  private constructor(orderItemProps: OrderItemProps) {
    this.productId = orderItemProps.productId;
    this.price = orderItemProps.price;
    this.amount = orderItemProps.amount;
  }

  public static create(props: OrderItemCreateProps) {
    return new OrderItem({ productId: new Id(), ...props });
  }

  public static restore(props: OrderItemRestoreProps) {
    return new OrderItem(props);
  }

  public get total() {
    return this.price.value * this.amount;
  }

  public incrementAmount(amount: number) {
    this.amount += amount;
  }
}
