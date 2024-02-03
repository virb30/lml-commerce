import { Queue } from "../../../Infra/Queue/Queue";
import { Id } from "../../@shared/Domain/ValueObject/Id";
import { Product } from "../Domain/Entity/Product";
import { ProductCreated } from "../Domain/Event/ProductCreated";
import { ProductRepository } from "../Domain/Repository/ProductRepository";

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
      finalPrice: product.getFinalPrice(),
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
  finalPrice: number;
  createdAt: Date;
};
