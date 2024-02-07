import { Module } from "@nestjs/common";
import { provideCatalogUsecases } from "./catalog.providers";

@Module({
  providers: [...provideCatalogUsecases()],
})
export class CatalogModule {}
