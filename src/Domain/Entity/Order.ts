import { OrderCode } from "../ValueObjects/OrderCode";
import { Email } from "../ValueObjects/Email";
import { Id } from "../ValueObjects/Id";
import { OrderItem } from "./OrderItem";
import { Product } from "./Product";
import { Freight } from "./Freight";

export class Order {
  private _items: OrderItem[] = [];
  public readonly code: OrderCode;
  public freight = new Freight();

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
    this.freight.addItem(product, amount);
  }

  public get total(): number {
    let total = this._items.reduce((sum, orderItem) => {
      sum += orderItem.total;
      return sum;
    }, 0);
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
