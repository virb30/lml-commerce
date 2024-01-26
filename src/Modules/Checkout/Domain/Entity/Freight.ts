import { Product } from "./Product";

export class Freight {
  public total = 0;
  private DISTANCE = 1000;
  private FACTOR = 100;
  private MIN_FREIGHT = 10;

  public addItem(product: Product, quantity: number): void {
    const freight = product.getVolume() * this.DISTANCE * (product.getDensity() / this.FACTOR);
    this.total += freight * quantity;
  }

  public getTotal(): number {
    return this.total > 0 && this.total <= this.MIN_FREIGHT ? this.MIN_FREIGHT : this.total;
  }
}
