import { Email } from "../ValueObjects/Email";
import { Id } from "../ValueObjects/Id";
import { OrderItem } from "./OrderItem";
import { Product } from "./Product";

export class Order {
  private _items: OrderItem[] = [];

  constructor(
    private id: Id,
    private email: Email,
    private date: Date,
    private sequency: number,
  ) {}

  public addItem(product: Product, amount: number): void {
    this._items.push(new OrderItem(product.id, product.price, amount));
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
}
