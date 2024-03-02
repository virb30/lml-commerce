import { Module } from "@nestjs/common";
import { QUEUE_PROVIDER_TOKEN, queueProvider } from "./queue.providers";

@Module({
  providers: [queueProvider],
  exports: [QUEUE_PROVIDER_TOKEN],
})
export class QueueModule {}
