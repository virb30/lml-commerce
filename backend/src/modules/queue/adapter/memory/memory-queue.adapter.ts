import { DomainEvent } from "../../../shared/domain/event/domain.event.interface";
import { Queue } from "../../queue.interface";

export class MemoryQueueAdapter implements Queue {
  consumers: Consumer[];

  constructor() {
    this.consumers = [];
  }

  public async connect(): Promise<void> {}

  public async close(): Promise<void> {}

  public async publish(event: DomainEvent): Promise<void> {
    for (const consumer of this.consumers) {
      if (consumer.eventName === event.getName()) {
        await consumer.callback(event);
      }
    }
  }

  public async consume(eventName: string, callback: any): Promise<void> {
    this.consumers.push({ eventName, callback });
  }
}

type Consumer = {
  eventName: string;
  callback: any;
};
