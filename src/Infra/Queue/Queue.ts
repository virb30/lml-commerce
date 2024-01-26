import { DomainEvent } from "../../Modules/@shared/Domain/Event/DomainEvent";

export interface Queue {
  connect(): Promise<void>;
  close(): Promise<void>;
  publish(event: DomainEvent): Promise<void>;
  consume(eventName: string, callback: any): Promise<void>;
}
