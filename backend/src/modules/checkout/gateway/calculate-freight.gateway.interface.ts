export interface CalculateFreightGateway {
  calculate(
    orderItems: { volume: number; density: number; quantity: number }[],
    from?: string | undefined | { lat: number; long: number },
    to?: string | undefined | { lat: number; long: number },
  ): Promise<number>;
}
