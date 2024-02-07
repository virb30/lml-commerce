import { Module } from "@nestjs/common";
import { StockController } from "./http/stock.controller";
import { provideStockRepositories, provideStockUsecases } from "./stock.providers";
import { DatabaseModule } from "../database/database.module";
import { ConfigModule } from "../config/config.module";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule],
  controllers: [StockController],
  providers: [...provideStockRepositories(), ...provideStockUsecases()],
})
export class StockModule {}
