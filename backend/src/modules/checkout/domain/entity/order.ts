import { OrderCode } from "../value-object/order-code";
import { Email } from "@modules/shared/domain/value-object/email";
import { Id } from "@modules/shared/domain/value-object/id";
import { OrderItem } from "./order-item";
import { Product } from "./product";
import { Freight } from "./freight";
import { Coupon } from "./coupon";
import { OrderCoupon } from "./order-coupon";

export class Order {
  private _items: OrderItem[] = [];
  public readonly code: OrderCode;
  public freight = new Freight();
  public coupon?: OrderCoupon;

  constructor(
    public readonly id: Id,
    public readonly email: Email,
    public readonly date: Date,
    public readonly sequency: number,
    public readonly currency: string = "brl",
  ) {
    this.code = new OrderCode(date, sequency);
  }

  public applyCoupon(coupon: Coupon): void {
    if (coupon.isValid(this.date)) {
      this.coupon = new OrderCoupon(coupon.code, coupon.percentage, coupon.discountLimit);
    }
  }

  public addItem(product: Product, amount: number): void {
    const orderItem = this.getItem(product.id);

    if (orderItem) {
      orderItem.incrementAmount(amount);
    } else {
      this._items.push(new OrderItem(product.id, product.price, amount));
    }
    this.freight.addItem(product, amount);
  }

  public get total(): number {
    let total = this._items.reduce((sum, orderItem) => {
      sum += orderItem.total;
      return sum;
    }, 0);

    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total);
    }

    total += this.freight.getTotal();
    return total;
  }

  public get items(): OrderItem[] {
    return this._items;
  }

  public set items(items: OrderItem[]) {
    this._items = items;
  }

  public getFreight(): number {
    return this.freight.getTotal();
  }

  private getItem(productId: Id): OrderItem | undefined {
    return this._items.find((item) => item.productId.value == productId.value);
  }
}
