import { Id } from "@modules/shared/domain/value-object/id";

export class Product {
  constructor(
    public readonly id: Id,
    public readonly name: string,
  ) {}
}
