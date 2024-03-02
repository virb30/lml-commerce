import { DomainEvent } from "@modules/shared/domain/event/domain.event.interface";

export class OrderPlaced implements DomainEvent {
  readonly name = "OrderPlaced";
  readonly dateTime: Date;
  private payload: any;

  constructor(payload: any, date?: Date) {
    this.dateTime = date ?? new Date();
    this.payload = payload;
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
