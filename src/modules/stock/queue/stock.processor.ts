import { StockHandler } from "../handler/stock.handler";
import { RepositoryFactory } from "src/modules/shared/domain/factory/repository-factory.interface";
import { OrderPlaced } from "src/modules/checkout/domain/event/order-placed";
import { Queue } from "../../queue/queue.interface";

export class StockProcessor {
  constructor(queue: Queue, repositoryFactory: RepositoryFactory) {
    queue.consume("OrderPlaced", async function (orderPlaced: OrderPlaced) {
      const stockHandler = new StockHandler(repositoryFactory);
      await stockHandler.handle(orderPlaced);
    });
  }
}
