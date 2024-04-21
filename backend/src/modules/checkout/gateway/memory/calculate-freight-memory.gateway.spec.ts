import { CalculateFreightGateway } from "../calculate-freight.gateway.interface";
import { CalculateFreightMemoryGateway } from "./calculate-freight-memory.gateway";

describe("CalculateFreightMemoryGateway tests", () => {
  let freightCalculator: CalculateFreightGateway;

  beforeEach(() => {
    freightCalculator = new CalculateFreightMemoryGateway();
  });

  it("should calculate freight", async () => {
    const orderItems = [
      {
        volume: 1000,
        density: 0.001,
        quantity: 3,
      },
      {
        volume: 125000,
        density: 0.00008,
        quantity: 1,
      },
      {
        volume: 30000,
        density: 0.0001,
        quantity: 1,
      },
    ];
    const total = await freightCalculator.calculate(orderItems);
    expect(total).toBe(160);
  });

  it("should calculate freight free", async () => {
    const orderItems = [
      {
        volume: 0,
        density: 0,
        quantity: 1,
      },
    ];
    const total = await freightCalculator.calculate(orderItems);
    expect(total).toBe(0);
  });
});
