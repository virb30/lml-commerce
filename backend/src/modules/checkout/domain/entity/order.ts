import { OrderCode } from "../value-object/order-code";
import { Email } from "@modules/shared/domain/value-object/email";
import { Id } from "@modules/shared/domain/value-object/id";
import { OrderItem } from "./order-item";
import { Product } from "./product";
import { Coupon } from "./coupon";
import { OrderCoupon } from "./order-coupon";

type OrderProps = {
  id: Id;
  email: Email;
  date: Date;
  sequence: number;
  currency?: string;
};

export type CreateOrderProps = Omit<OrderProps, "id">;

export type RestoreOrderProps = OrderProps & {
  currency?: string;
  coupon?: OrderCoupon;
  freight: number;
  items: OrderItem[];
};

export class Order {
  readonly id: Id;
  readonly email: Email;
  readonly date: Date;
  readonly sequency: number;
  readonly currency: string;
  readonly code: OrderCode;
  coupon?: OrderCoupon;

  private _items: OrderItem[] = [];
  private _freight: number = 0;

  private constructor({ id, email, date, sequence, currency }: OrderProps) {
    this.id = id;
    this.email = email;
    this.date = date;
    this.currency = currency ?? "brl";
    this.sequency = sequence;
    this.code = new OrderCode(date, sequence);
  }

  applyCoupon(coupon: Coupon): void {
    if (coupon.isValid(this.date)) {
      this.coupon = new OrderCoupon(coupon.code, coupon.percentage, coupon.discountLimit);
    }
  }

  addItem(product: Product, amount: number): void {
    const orderItem = this.getItem(product.id);

    if (orderItem) {
      orderItem.incrementAmount(amount);
    } else {
      this._items.push(new OrderItem(product.id, product.price, amount));
    }
  }

  get total(): number {
    let total = this._items.reduce((sum, orderItem) => {
      sum += orderItem.total;
      return sum;
    }, 0);

    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total);
    }

    total += this.freight;
    return total;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  set items(items: OrderItem[]) {
    this._items = items;
  }

  get freight() {
    return this._freight;
  }

  changeFreight(freight: number): void {
    this._freight = freight;
  }

  private getItem(productId: Id): OrderItem | undefined {
    return this._items.find((item) => item.productId.value == productId.value);
  }

  static create(props: CreateOrderProps): Order {
    return new Order({ id: new Id(), ...props });
  }

  static restore({ id, email, date, sequence, currency, ...props }: RestoreOrderProps): Order {
    const order = new Order({ id, email, date, sequence, currency });
    order.coupon = props.coupon;
    order.items = props.items;
    order.changeFreight(props.freight);
    return order;
  }
}
