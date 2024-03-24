import { Queue } from "@modules/queue/queue.interface";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Id } from "@modules/shared/domain/value-object/id";
import { ProductUpdated } from "../domain/event/product-updated.evet";
import { Usecase } from "@modules/shared/usecase/usecase.interface";
import { CurrencyFactory } from "@modules/shared/domain/value-object/currency/currency.factory";

export class UpdateProductUseCase implements Usecase {
  constructor(
    private productRepository: ProductRepository,
    private queue: Queue,
  ) {}

  async execute(input: UpdateProductInput): Promise<UpdateProductOutput> {
    const price = CurrencyFactory.make(input.price, input.currency);
    const product = await this.productRepository.findById(new Id(input.id));
    product.changeName(input.name);
    product.changePrice(price);
    await this.productRepository.save(product);

    const outputProduct = {
      id: product.id.value,
      name: product.name,
      price: product.price.value,
    };

    const productCreated = new ProductUpdated(outputProduct, input.date ?? new Date());
    await this.queue.publish(productCreated);

    return outputProduct;
  }
}

export type UpdateProductInput = {
  id: string;
  name: string;
  price: number;
  currency: string;
  date?: Date;
};

export type UpdateProductOutput = {
  id: string;
  name: string;
  price: number;
};
