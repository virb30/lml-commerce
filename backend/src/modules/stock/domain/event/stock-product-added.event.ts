import { DomainEvent } from "@modules/shared/domain/event/domain.event.interface";

export class StockProductAdded implements DomainEvent {
  name = "StockProductAdded";
  dateTime: Date;

  constructor(
    private readonly payload: any,
    date?: Date,
  ) {
    this.dateTime = date ?? new Date();
  }

  public getName(): string {
    return this.name;
  }

  public getDateTime(): Date {
    return this.dateTime;
  }

  public getPayload(): any {
    return this.payload;
  }
}
