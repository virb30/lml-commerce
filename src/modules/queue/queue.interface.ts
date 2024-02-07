import { DomainEvent } from "../shared/domain/event/domain.event.interface";

export interface Queue {
  connect(): Promise<void>;
  close(): Promise<void>;
  publish(event: DomainEvent): Promise<void>;
  consume(eventName: string, callback: any): Promise<void>;
}
