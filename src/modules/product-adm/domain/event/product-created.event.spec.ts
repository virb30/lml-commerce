import { ProductCreated } from "./product-created.event";

describe("ProductCreated event tests", () => {
  it("creates a ProductCreated Event", () => {
    const date = new Date("2023-01-01T10:00:00");
    const payload = {
      id: "1",
      name: "Produto Teste",
      price: 1000,
    };

    const event = new ProductCreated(payload, date);
    expect(event.getName()).toBe("ProductCreated");
    expect(event.getDateTime()).toEqual(date);
    expect(event.getPayload()).toStrictEqual(payload);
  });
});
