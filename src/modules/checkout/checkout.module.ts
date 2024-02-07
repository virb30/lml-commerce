import { Module } from "@nestjs/common";
import { OrderController } from "./http/order.controller";
import { provideCheckoutRepositories, provideCheckoutUsecases } from "./checkout.providers";
import { QueueModule } from "../queue/queue.module";

@Module({
  imports: [QueueModule],
  controllers: [OrderController],
  providers: [...provideCheckoutRepositories(), ...provideCheckoutUsecases()],
})
export class CheckoutModule {}
