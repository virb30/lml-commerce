import { Test, TestingModule } from "@nestjs/testing";
import { ProductAdmController } from "./product-adm.controller";
import { ConfigModule } from "@modules/config/config.module";
import { registerAs } from "@nestjs/config";
import { CreateProductUseCase } from "../usecase/create-product.usecase";
import { ProductAdmModule } from "../product-adm.module";
import { UpdateProductUseCase } from "../usecase/update-product.usecase";

describe("ProductAdmController", () => {
  let controller: ProductAdmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(registerAs("data", () => ({ source: "memory" }))), ProductAdmModule],
      controllers: [ProductAdmController],
      providers: [CreateProductUseCase, UpdateProductUseCase],
    }).compile();

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

  it("updates a product", async () => {
    const product = await controller.create("Product 1", 50);
    expect(product.id).toBeDefined();

    const output = await controller.update(product.id, "Product 1 updated", 100);
    expect(output.price).toBe(100);
    expect(output.id).toBe(product.id);
    expect(output.name).toBe("Product 1 updated");
    expect(output.finalPrice).toBe(1);
  });
});
