import { OrderCode } from "../src/Domain/ValueObjects/OrderCode";

describe("OrderCode tests", () => {
  it("should create a code in valid format", () => {
    const code = new OrderCode(new Date("2023-10-20"), 11);
    expect(code.value).toEqual("202300000011");
  });
});