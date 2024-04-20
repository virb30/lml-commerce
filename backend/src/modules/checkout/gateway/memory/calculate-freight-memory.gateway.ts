import { CalculateFreightGateway } from "../calculate-freight.gateway.interface";

export class CalculateFreightMemoryGateway implements CalculateFreightGateway {
  private DISTANCE = 1000;
  private FACTOR = 100;
  private MIN_FREIGHT = 10;

  async calculate(
    orderItems: { volume: number; density: number; quantity: number }[],
    from?: string,
    to?: string,
  ): Promise<number> {
    let total = orderItems.reduce((total, item) => {
      const itemFreight = item.volume * this.DISTANCE * (item.density / this.FACTOR);
      total += itemFreight * item.quantity;
      return total;
    }, 0);

    return total;
  }
}
