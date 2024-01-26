import { OrderPlaced } from "./OrderPlaced";

describe("OrderPlaced event tests", () => {
  it("Should create an OrderPlaced Event", () => {
    const date = new Date("2023-01-01T10:00:00");
    const payload = {
      orderId: "1",
      items: [
        { productId: "1", amount: 1 },
        { productId: "2", amount: 2 },
        { productId: "3", amount: 1 },
      ],
      total: 40.0,
    };

    const event = new OrderPlaced(payload, date);
    expect(event.getName()).toBe("OrderPlaced");
    expect(event.getDateTime()).toEqual(date);
    expect(event.getPayload()).toStrictEqual(payload);
  });
});
