import { OrderCode } from "../value-object/order-code";
import { Email } from "@modules/shared/domain/value-object/email";
import { Id } from "@modules/shared/domain/value-object/id";
import { OrderItem } from "./order-item";
import { Product } from "./product";
import { Freight } from "./freight";
import { Coupon } from "./coupon";
import { OrderCoupon } from "./order-coupon";
import { OrderStatus } from "../value-object/order-status";

export class Order {
  private _items: OrderItem[] = [];
  public readonly code: OrderCode;
  public freight = new Freight();
  public coupon?: OrderCoupon;
  private _status: OrderStatus;

  constructor(
    public readonly id: Id,
    public readonly email: Email,
    public readonly date: Date,
    public readonly sequency: number,
    public readonly currency: string = "brl",
    status = OrderStatus.Pending,
  ) {
    this.code = new OrderCode(date, sequency);
    this._status = status;
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

  public get status(): string {
    return this._status;
  }

  cancel() {
    if (this._status !== OrderStatus.Pending) throw new Error("Cannot cancel order");
    this._status = OrderStatus.Cancelled;
  }

  confirmPayment() {
    if (this._status !== OrderStatus.Pending) throw new Error("Cannot confirm order");
    this._status = OrderStatus.Confirmed;
  }

  prepareSend() {
    if (this._status !== OrderStatus.Confirmed) throw new Error("Order must be confirmed");
    this._status = OrderStatus.Separation;
  }

  dispatch() {
    if (this._status !== OrderStatus.Confirmed) throw new Error("Order must be confirmed");
    this._status = OrderStatus.Transporting;
  }

  finish() {
    if (this._status !== OrderStatus.Transporting) throw new Error("Cannot finish order");
    this._status = OrderStatus.Done;
  }
}
