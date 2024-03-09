import { Module } from "@nestjs/common";
import { provideCatalogQueries, provideCatalogUsecases } from "./catalog.providers";
import { CatalogController } from "./http/catalog.controller";

@Module({
  providers: [...provideCatalogQueries(), ...provideCatalogUsecases()],
  controllers: [CatalogController],
})
export class CatalogModule {}
