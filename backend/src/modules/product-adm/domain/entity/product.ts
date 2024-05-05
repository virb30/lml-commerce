import { Currency } from "@modules/shared/domain/value-object/currency/currency";
import { Id } from "@modules/shared/domain/value-object/id";
import { InputError } from "@modules/shared/errors/input.error";

type productProps = {
  id: Id;
  name: string;
  price: Currency;
  createdAt: Date;
  updatedAt: Date;
};

export type productPropsCreate = Omit<productProps, "id" | "createdAt" | "updatedAt">;
export type productPropsRestore = productProps;

export class Product {
  readonly id: Id;
  private _price: Currency;
  private _name: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor({ id, name, price, createdAt, updatedAt }: productProps) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.changeName(name);
    this.changePrice(price);
  }

  static create(props: productPropsCreate): Product {
    const now = new Date();
    return new Product({ id: new Id(), createdAt: now, updatedAt: now, ...props });
  }

  static restore(props: productPropsRestore): Product {
    return new Product(props);
  }

  changeName(name: string): void {
    this._name = name;
    if (!this._name) throw new InputError("Invalid name");
  }

  get name(): string {
    return this._name;
  }

  changePrice(price: Currency): void {
    this._price = price;
  }

  get price(): Currency {
    return this._price;
  }
}
