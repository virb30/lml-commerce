import { Test } from "@nestjs/testing";
import { ConfigModule } from "../config/config.module";
import { TOKENS } from "./constants";
import { ProductAdmModule } from "./product-adm.module";
import { CreateProductUseCase } from "./usecase/create-product.usecase";
import { ProductRepositoryMemory } from "./repository/memory/product.repository";
import { ProductRepositoryDatabase } from "./repository/database/product.repository";
import { registerDataSource } from "../../fixtures/data-source.fixture";
import { AuthModule } from "@modules/auth/auth.module";

describe("ProductAdmProvider tests", () => {
  describe("usecases tests", () => {
    it("provides CreateProductUseCase", async () => {
      const module = await Test.createTestingModule({
        imports: [AuthModule, ProductAdmModule],
      }).compile();
      const provider = module.get(CreateProductUseCase);

      expect(provider).toBeDefined();
      expect(provider).toBeInstanceOf(CreateProductUseCase);
    });
  });

  describe("repositories tests", () => {
    it.each([
      { dataSource: "memory", instance: ProductRepositoryMemory },
      { dataSource: "adapter", instance: ProductRepositoryDatabase },
    ])("provides $instance.name", async ({ dataSource, instance }) => {
      const module = await Test.createTestingModule({
        imports: [ConfigModule.forFeature(registerDataSource(dataSource)), AuthModule, ProductAdmModule],
      }).compile();
      const provider = module.get(TOKENS.PRODUCT_REPOSITORY);

      expect(provider).toBeInstanceOf(instance);
    });
  });
});
