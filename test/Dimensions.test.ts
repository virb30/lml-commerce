import { Dimensions } from "../src/Domain/ValueObjects/Dimensions";

describe("Dimesion tests", () => {
  const dataDimensions = [
    [-25, -30, -45],
    [-25, 30, 45],
    [25, -30, 45],
    [25, 30, -45],
    [0, 0, 0],
    [0, 1, 1],
    [1, 0, 1],
    [1, 1, 0],
  ];
  it.each(dataDimensions)("should create an dimension with invalid numbers", (height, width, length) => {
    expect(() => {
      new Dimensions(height, width, length);
    }).toThrowError("Invalid values");
  });

  it("should create an dimesion", () => {
    const dimension = new Dimensions(10, 20, 30);
    expect(dimension.getVolume()).toEqual(6000);
  });
});
