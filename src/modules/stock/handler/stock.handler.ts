import { DomainEvent } from "src/modules/shared/domain/event/domain.event.interface";
import { RepositoryFactory } from "src/modules/checkout/domain/factory/repository-factory.interface";
import { Id } from "src/modules/shared/domain/value-object/id";
import { StockEntry } from "../domain/entity/stock-entry.entity";
import { StockEntryRepository } from "../domain/repository/stock-entry.repository.interface";

export class StockHandler {
  constructor(private readonly stockEntryRepository: StockEntryRepository) {}

  public async handle(event: DomainEvent): Promise<void> {
    const payload = event.getPayload();
    for (const item of payload.items) {
      await this.stockEntryRepository.save(new StockEntry(new Id(item.productId), "out", item.amount));
    }
  }
}
