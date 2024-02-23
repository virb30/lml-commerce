import { ProductUpdated } from "./product-updated.evet";

describe("UpdateProduct event tests", () => {
  it("creates a ProductUpdated Event", () => {
    const date = new Date("2023-01-01T10:00:00");
    const payload = {
      id: "1",
      name: "Produto Teste",
      price: 1000,
    };

    const event = new ProductUpdated(payload, date);
    expect(event.getName()).toBe("ProductUpdated");
    expect(event.getDateTime()).toEqual(date);
    expect(event.getPayload()).toStrictEqual(payload);
  });
});
