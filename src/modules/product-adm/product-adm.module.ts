import { Module } from "@nestjs/common";
import { provideProductAdmRepositories, provideProductAdmUsecases } from "./product-adm.providers";
import { QueueModule } from "../queue/queue.module";

@Module({
  imports: [QueueModule],
  providers: [...provideProductAdmRepositories(), ...provideProductAdmUsecases()],
})
export class ProductAdmModule {}
