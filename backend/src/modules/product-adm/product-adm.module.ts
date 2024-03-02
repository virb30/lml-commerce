import { Module } from "@nestjs/common";
import { provideProductAdmRepositories, provideProductAdmUsecases } from "./product-adm.providers";
import { QueueModule } from "../queue/queue.module";
import { ConfigModule } from "../config/config.module";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule, QueueModule],
  providers: [...provideProductAdmRepositories(), ...provideProductAdmUsecases()],
})
export class ProductAdmModule {}
