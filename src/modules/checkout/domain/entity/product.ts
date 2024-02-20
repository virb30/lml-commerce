import { Dimensions } from "../value-object/dimensions";
import { Id } from "src/modules/shared/domain/value-object/id";

export class Product {
  constructor(
    public readonly id: Id,
    public readonly name: string,
    public readonly price: number,
    public readonly dimensions?: Dimensions,
    public readonly weight?: number,
  ) {
    if (weight && weight < 0) throw new Error("Invalid weight");
  }

  public getDensity(): number {
    if (this.dimensions && this.weight) {
      return this.weight / this.dimensions.getVolume();
    } else {
      return 0;
    }
  }

  public getVolume(): number {
    if (this.dimensions) {
      return this.dimensions.getVolume();
    } else {
      return 0;
    }
  }
}
