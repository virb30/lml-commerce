import { DomainEvent } from "../../../Domain/@shared/Event/DomainEvent";

export interface Queue {
  connect(): Promise<void>;
  close(): Promise<void>;
  publish(event: DomainEvent): Promise<void>;
  consume(eventName: string, callback: any): Promise<void>;
}
