import { OrderCode } from "../ValueObjects/OrderCode";
import { Email } from "../ValueObjects/Email";
import { Id } from "../ValueObjects/Id";
import { OrderItem } from "./OrderItem";
import { Product } from "./Product";

export class Order {
  private _items: OrderItem[] = [];
  public readonly code: OrderCode;

  constructor(
    public readonly id: Id,
    public readonly email: Email,
    public readonly date: Date,
    public readonly sequency: number,
  ) {
    this.code = new OrderCode(date, sequency);
  }

  public addItem(product: Product, amount: number): void {
    const orderItem = this.getItem(product.id);

    if (orderItem) {
      orderItem.incrementAmount(amount);
    } else {
      this._items.push(new OrderItem(product.id, product.price, amount));
    }
  }

  public get total(): number {
    return this._items.reduce((acc, orderItem) => {
      acc += orderItem.total;
      return acc;
    }, 0);
  }

  public get items(): OrderItem[] {
    return this._items;
  }

  public set items(items: OrderItem[]) {
    this._items = items;
  }

  private getItem(productId: Id): OrderItem | undefined {
    return this._items.find((item) => item.productId.value == productId.value);
  }
}
