import { InputError } from "@modules/shared/errors/input.error";

export class Dimensions {
  constructor(
    public readonly height: number,
    public readonly width: number,
    public readonly length: number,
  ) {
    if (height < 0 || width < 0 || length < 0) {
      throw new InputError("Invalid values");
    }
  }

  public getVolume(): number {
    return this.height * this.width * this.length;
  }
}
