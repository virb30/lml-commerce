import { StockHandler } from "../handler/stock.handler";
import { OrderPlaced } from "src/modules/checkout/domain/event/order-placed";
import { Queue } from "../../queue/queue.interface";
import { StockEntryRepository } from "../domain/repository/stock-entry.repository.interface";
import { Inject, Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { REPOSITORIES } from "../stock.providers";
import { QUEUE_PROVIDER_TOKEN } from "src/modules/queue/queue.providers";

@Injectable()
export class StockProcessor {
  constructor(
    @Inject(QUEUE_PROVIDER_TOKEN) queue: Queue,
    @Inject(REPOSITORIES.STOCK_ENTRY_REPOSITORY.provide) stockEntryRepository: StockEntryRepository,
  ) {
    queue.consume("OrderPlaced", async function (orderPlaced: OrderPlaced) {
      const stockHandler = new StockHandler(stockEntryRepository);
      await stockHandler.handle(orderPlaced);
    });
  }
}
