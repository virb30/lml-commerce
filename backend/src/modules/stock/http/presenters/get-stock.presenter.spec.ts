import { GetStockPresenter } from "./get-stock.presenter";

describe("GetStockPresenter tests", () => {
  it("should return json", () => {
    const dto = {
      total: 10,
    };
    const output = GetStockPresenter.toJson(dto);
    const expected = {
      total: 10,
    };
    expect(output).toStrictEqual(expected);
  });
});
