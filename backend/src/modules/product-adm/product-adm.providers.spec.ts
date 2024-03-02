import { Test } from "@nestjs/testing";
import { ConfigModule } from "../config/config.module";
import { registerAs } from "@nestjs/config";
import { TOKENS } from "./constants";
import { ProductAdmModule } from "./product-adm.module";
import { CreateProductUseCase } from "./usecase/create-product.usecase";
import { ProductRepositoryMemory } from "./repository/memory/product.repository";
import { ProductRepositoryDatabase } from "./repository/database/product.repository";

const registerDataSource = (source: string) => {
  return registerAs("data", () => ({ source }));
};

describe("ProductAdmProvider tests", () => {
  describe("usecases tests", () => {
    it("provides CreateProductUseCase", async () => {
      const module = await Test.createTestingModule({
        imports: [ProductAdmModule],
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
        imports: [ConfigModule.forFeature(registerDataSource(dataSource)), ProductAdmModule],
      }).compile();
      const provider = module.get(TOKENS.PRODUCT_REPOSITORY);

      expect(provider).toBeInstanceOf(instance);
    });
  });
});
