import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StockModule } from "./stock/stock.module";
import { ProductAdmModule } from "./product-adm/product-adm.module";
import { CheckoutModule } from "./checkout/checkout.module";
import { ConfigModule } from "./config/config.module";
import { DatabaseModule } from "./database/database.module";
import { CatalogModule } from "./catalog/catalog.module";
import { QueueModule } from "./queue/queue.module";
import { CurrencyModule } from "./currency/currency.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CurrencyModule,
    AuthModule,
    StockModule,
    ProductAdmModule,
    CheckoutModule,
    CatalogModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
