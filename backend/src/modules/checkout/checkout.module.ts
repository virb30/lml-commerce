import { Module } from "@nestjs/common";
import { OrderController } from "./http/order.controller";
import {
  provideCheckoutGateways,
  provideCheckoutQueries,
  provideCheckoutRepositories,
  provideCheckoutUsecases,
} from "./checkout.providers";
import { QueueModule } from "../queue/queue.module";
import { ConfigModule } from "../config/config.module";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, QueueModule],
  controllers: [OrderController],
  providers: [
    ...provideCheckoutRepositories(),
    ...provideCheckoutQueries(),
    ...provideCheckoutGateways(),
    ...provideCheckoutUsecases(),
  ],
})
export class CheckoutModule {}
