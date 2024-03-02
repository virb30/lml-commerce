import { DomainEvent } from "../../../shared/domain/event/domain.event.interface";
import { MemoryQueueAdapter } from "./memory-queue.adapter";

class TestEvent implements DomainEvent {
  name = "TestEvent";
  dateTime = new Date();

  public getName(): string {
    return this.name;
  }

  public getDateTime(): Date {
    return this.dateTime;
  }

  public getPayload(): any {
    return "test";
  }
}

describe("MemoryQueueAdapter tests", () => {
  it("should publish an event", async () => {
    const queue = new MemoryQueueAdapter();
    const testEvent = new TestEvent();
    const spyFunction = jest.fn();
    await queue.consume(testEvent.getName(), spyFunction);
    await queue.publish(testEvent);
    expect(spyFunction).toHaveBeenCalledWith(testEvent);
  });
});
