export interface CalculateFreightGateway {
  calculate(
    orderItems: { volume: number; density: number; quantity: number }[],
    from?: string | undefined,
    to?: string | undefined,
  ): Promise<number>;
}
