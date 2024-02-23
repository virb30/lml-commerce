import { DomainEvent } from "src/modules/shared/domain/event/domain.event.interface";

export class ProductUpdated implements DomainEvent {
  readonly name: string = "ProductUpdated";
  readonly dateTime: Date;
  private payload: any;

  constructor(payload: any, date?: Date) {
    this.dateTime = date ?? new Date();
    this.payload = payload;
  }

  getName(): string {
    return this.name;
  }

  getDateTime(): Date {
    return this.dateTime;
  }

  getPayload() {
    return this.payload;
  }
}
