import { Queue } from "../../queue/queue.interface";
import { Id } from "@modules/shared/domain/value-object/id";
import { Product } from "../domain/entity/product";
import { ProductCreated } from "../domain/event/product-created.event";
import { ProductRepository } from "../domain/repository/product.repository.interface";

export class CreateProductUseCase {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly queue: Queue,
  ) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const product = new Product(new Id(), input.name, input.price);
    await this.productRepository.save(product);

    const payload = {
      id: product.id.value,
      name: product.name,
      price: product.price,
      createdAt: product.createdAt,
    };

    const productCreated = new ProductCreated(payload, new Date());
    await this.queue.publish(productCreated);
    return payload;
  }
}

type CreateProductInput = {
  name: string;
  price: number;
};

type CreateProductOutput = {
  id: string;
  name: string;
  price: number;
  createdAt: Date;
};
