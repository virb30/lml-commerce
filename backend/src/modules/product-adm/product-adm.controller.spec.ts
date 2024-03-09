import { Test, TestingModule } from "@nestjs/testing";
import { ProductAdmController } from "./product-adm.controller";
import { ConfigModule } from "@modules/config/config.module";
import { registerAs } from "@nestjs/config";
import { Usecase } from "@modules/shared/usecase/usecase.interface";
import { CreateProductUseCase } from "./usecase/create-product.usecase";
import { ProductAdmModule } from "./product-adm.module";

describe("ProductAdmController", () => {
  let controller: ProductAdmController;
  let usecase: Usecase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(registerAs("data", () => ({ source: "memory" }))), ProductAdmModule],
      controllers: [ProductAdmController],
      providers: [CreateProductUseCase],
    }).compile();

    usecase = module.get<Usecase>(CreateProductUseCase);
    controller = module.get<ProductAdmController>(ProductAdmController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("creates a product", async () => {
    const output = await controller.create("Product 1", 50);
    expect(output.id).toBeDefined();
    expect(output.name).toBe("Product 1");
    expect(output.finalPrice).toBe(0.5);
    expect(output.price).toBe(50);
  });
});
