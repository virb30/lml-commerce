export interface DomainEvent {
  readonly name: string;
  readonly dateTime: Date;
  getName(): string;
  getDateTime(): Date;
  getPayload(): any;
}
