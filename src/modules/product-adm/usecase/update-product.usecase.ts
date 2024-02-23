import { Queue } from "src/modules/queue/queue.interface";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Id } from "src/modules/shared/domain/value-object/id";
import { ProductUpdated } from "../domain/event/product-updated.evet";

export class UpdateProductUseCase {
  constructor(
    private productRepository: ProductRepository,
    private queue: Queue,
  ) {}

  async execute(input: updateProductInput): Promise<updateProductOutput> {
    const product = await this.productRepository.findById(new Id(input.id));
    product.changeName(input.name);
    product.changePrice(input.price);
    await this.productRepository.save(product);

    const outputProduct = {
      id: product.id.value,
      name: product.name,
      price: product.price,
      finalPrice: product.getFinalPrice(),
    };

    const productCreated = new ProductUpdated(outputProduct, input.date ?? new Date());
    await this.queue.publish(productCreated);

    return outputProduct;
  }
}

type updateProductInput = {
  id: string;
  name: string;
  price: number;
  date?: Date;
};

type updateProductOutput = {
  id: string;
  name: string;
  price: number;
  finalPrice: number;
};
