import { StockHandler } from "../../../Application/Stock/handler/StockHandler";
import { RepositoryFactory } from "../../../Domain/@shared/Factory/RepositoryFactory";
import { OrderPlaced } from "../../../Domain/Checkout/Event/OrderPlaced";
import { Queue } from "../../@shared/Queue/Queue";

export class StockController {
  constructor(queue: Queue, repositoryFactory: RepositoryFactory) {
    queue.consume("OrderPlaced", async function (orderPlaced: OrderPlaced) {
      const stockHandler = new StockHandler(repositoryFactory);
      await stockHandler.handle(orderPlaced);
    });
  }
}
