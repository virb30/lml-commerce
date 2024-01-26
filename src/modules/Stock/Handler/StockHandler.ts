import { DomainEvent } from "../../../Domain/@shared/Event/DomainEvent";
import { RepositoryFactory } from "../../../Domain/@shared/Factory/RepositoryFactory";
import { Id } from "../../../Domain/@shared/ValueObject/Id";
import { StockEntry } from "../Domain/Entity/StockEntry";
import { StockEntryRepository } from "../Domain/Repository/StockEntryRepository";

export class StockHandler {
  private stockEntryRepository: StockEntryRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.stockEntryRepository = repositoryFactory.makeStockEntryRepository();
  }

  public async handle(event: DomainEvent): Promise<void> {
    const payload = event.getPayload();
    for (const item of payload.items) {
      await this.stockEntryRepository.save(new StockEntry(new Id(item.productId), "out", item.amount));
    }
  }
}
