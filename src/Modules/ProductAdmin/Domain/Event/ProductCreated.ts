import { DomainEvent } from "../../../@shared/Domain/Event/DomainEvent";

export class ProductCreated implements DomainEvent {
  readonly name: string = "ProductCreated";
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
