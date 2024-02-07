import { ConfigService } from "@nestjs/config";
import { MemoryQueueAdapter } from "./adapter/memory/memory-queue.adapter";
import { Queue } from "./queue.interface";

export const QUEUE_PROVIDER_TOKEN = "QUEUE";

export const queueProvider = {
  provide: QUEUE_PROVIDER_TOKEN,
  useFactory: (): Queue => {
    return new MemoryQueueAdapter();
  },
  inject: [ConfigService],
};
