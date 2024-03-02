import { Module } from "@nestjs/common";
import { StockController } from "./http/stock.controller";
import { provideStockRepositories, provideStockUsecases } from "./stock.providers";
import { DatabaseModule } from "../database/database.module";
import { ConfigModule } from "../config/config.module";
import { QueueModule } from "../queue/queue.module";
import { StockProcessor } from "./queue/stock.processor";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, QueueModule],
  controllers: [StockController],
  providers: [...provideStockRepositories(), ...provideStockUsecases(), StockProcessor],
})
export class StockModule {}
