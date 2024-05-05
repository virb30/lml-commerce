import { Queue } from "../../queue/queue.interface";
import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "../domain/entity/product";
import { ProductCreated } from "../domain/event/product-created.event";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Usecase } from "@modules/shared/usecase/usecase.interface";
import { CurrencyFactory } from "@modules/shared/domain/value-object/currency/currency.factory";

export class CreateProductUseCase implements Usecase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly queue: Queue,
  ) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const price = CurrencyFactory.make(input.price, input.currency);
    const product = Product.create({ name: input.name, price });
    await this.productRepository.save(product);

    const payload = {
      id: product.id.value,
      name: product.name,
      price: product.price.value,
      currency: product.price.code,
      createdAt: product.createdAt,
    };

    const productCreated = new ProductCreated(payload, new Date());
    await this.queue.publish(productCreated);
    return payload;
  }
}

export type CreateProductInput = {
  name: string;
  price: number;
  currency: string;
};

export type CreateProductOutput = {
  id: string;
  name: string;
  price: number;
  currency: string;
  createdAt: Date;
};
