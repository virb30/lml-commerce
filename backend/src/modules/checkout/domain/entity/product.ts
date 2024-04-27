import { Currency } from "@modules/shared/domain/value-object/currency/currency";
import { Dimensions } from "../value-object/dimensions";
import { Id } from "@modules/shared/domain/value-object/id";
import { InputError } from "@modules/shared/errors/input.error";

type ProductProps = {
  id: Id;
  name: string;
  price: Currency;
  dimensions?: Dimensions;
  weight?: number;
};

export type CreateProductProps = Omit<ProductProps, "id">;
export type RestoreProductProps = ProductProps;

export class Product {
  public readonly id: Id;
  public readonly name: string;
  public readonly price: Currency;
  public readonly dimensions?: Dimensions;
  public readonly weight?: number;

  private constructor({ id, name, price, dimensions, weight }: ProductProps) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.dimensions = dimensions;
    this.weight = weight;
    this.verifyWeight();
  }

  public static create(props: CreateProductProps): Product {
    return new Product({ id: new Id(), ...props });
  }

  public static restore(props: RestoreProductProps): Product {
    return new Product(props);
  }

  private verifyWeight(): void {
    if (this.weight && this.weight < 0) throw new InputError("Invalid weight");
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
