import { Usecase } from "@modules/shared/usecase/usecase.interface";
import { StockEntryRepository } from "../domain/repository/stock-entry.repository.interface";
import { StockEntry } from "../domain/entity/stock-entry.entity";
import { Id } from "@modules/shared/domain/value-object/id";
import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Queue } from "@modules/queue/queue.interface";
import { StockProductAdded } from "../domain/event/stock-product-added.event";

export class AddProductStockUseCase implements Usecase {
  public constructor(
    private readonly productRepository: ProductRepository,
    private readonly stockEntryRepository: StockEntryRepository,
    private readonly queue: Queue,
  ) {}

  public async execute(input: AddProductStockInput): Promise<AddProductStockOutput> {
    const product = await this.productRepository.findById(new Id(input.productId));
    await this.stockEntryRepository.save(new StockEntry(product.id, "in", input.quantity));

    const output = {
      productId: input.productId,
      quantity: input.quantity,
    };

    await this.queue.publish(new StockProductAdded(output, input.date));
    return output;
  }
}

type AddProductStockInput = {
  productId: string;
  quantity: number;
  date: Date;
};

type AddProductStockOutput = {
  productId: string;
  quantity: number;
};
