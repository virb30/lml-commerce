import { Module } from "@nestjs/common";
import { OrderController } from "./http/order.controller";
import { provideCheckoutQueries, provideCheckoutRepositories, provideCheckoutUsecases } from "./checkout.providers";
import { QueueModule } from "../queue/queue.module";

@Module({
  imports: [QueueModule],
  controllers: [OrderController],
  providers: [...provideCheckoutRepositories(), ...provideCheckoutQueries(), ...provideCheckoutUsecases()],
})
export class CheckoutModule {}
