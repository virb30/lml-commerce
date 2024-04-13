import { InputError } from "@modules/shared/errors/input.error";
import { Dimensions } from "./dimensions";

describe("Dimesion tests", () => {
  const dataDimensions = [
    [-25, -30, -45],
    [-25, 30, 45],
    [25, -30, 45],
    [25, 30, -45],
  ];
  it.each(dataDimensions)("should create an dimension with invalid numbers", (height, width, length) => {
    expect(() => {
      new Dimensions(height, width, length);
    }).toThrow(new InputError("Invalid values"));
  });

  it("should create an dimesion", () => {
    const dimension = new Dimensions(10, 20, 30);
    expect(dimension.getVolume()).toEqual(6000);
  });
});
