import { OrderCode } from "../value-object/order-code";
import { Email } from "@modules/shared/domain/value-object/email";
import { Id } from "@modules/shared/domain/value-object/id";
import { OrderItem } from "./order-item";
import { Product } from "./product";
import { Coupon } from "./coupon";
import { OrderCoupon } from "./order-coupon";

export class Order {
  private _items: OrderItem[] = [];
  readonly code: OrderCode;
  coupon?: OrderCoupon;
  private _freight: number = 0;

  constructor(
    readonly id: Id,
    readonly email: Email,
    readonly date: Date,
    readonly sequency: number,
    readonly currency: string = "brl",
  ) {
    this.code = new OrderCode(date, sequency);
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
}
