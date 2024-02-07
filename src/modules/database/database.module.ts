import { Global, Module } from "@nestjs/common";
import { CONNECTION_PROVIDER_TOKEN, databaseProvider } from "./database.providers";

@Global()
@Module({
  providers: [databaseProvider],
  exports: [CONNECTION_PROVIDER_TOKEN],
})
export class DatabaseModule {}
