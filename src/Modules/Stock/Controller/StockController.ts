import { StockHandler } from "../Handler/StockHandler";
import { RepositoryFactory } from "../../@shared/Domain/Factory/RepositoryFactory";
import { OrderPlaced } from "../../Checkout/Domain/Event/OrderPlaced";
import { Queue } from "../../../Infra/Queue/Queue";

export class StockController {
  constructor(queue: Queue, repositoryFactory: RepositoryFactory) {
    queue.consume("OrderPlaced", async function (orderPlaced: OrderPlaced) {
      const stockHandler = new StockHandler(repositoryFactory);
      await stockHandler.handle(orderPlaced);
    });
  }
}
