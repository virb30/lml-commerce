import { StockHandler } from "../../../modules/Stock/Handler/StockHandler";
import { RepositoryFactory } from "../../../Domain/@shared/Factory/RepositoryFactory";
import { OrderPlaced } from "../../Checkout/Domain/Event/OrderPlaced";
import { Queue } from "../../../Infra/@shared/Queue/Queue";

export class StockController {
  constructor(queue: Queue, repositoryFactory: RepositoryFactory) {
    queue.consume("OrderPlaced", async function (orderPlaced: OrderPlaced) {
      const stockHandler = new StockHandler(repositoryFactory);
      await stockHandler.handle(orderPlaced);
    });
  }
}
