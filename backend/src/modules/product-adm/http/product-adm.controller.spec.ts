import { Test, TestingModule } from "@nestjs/testing";
import { ProductAdmController } from "./product-adm.controller";
import { ConfigModule } from "@modules/config/config.module";
import { CreateProductUseCase } from "../usecase/create-product.usecase";
import { ProductAdmModule } from "../product-adm.module";
import { UpdateProductUseCase } from "../usecase/update-product.usecase";
import { registerDataSource } from "../../../fixtures/data-source.fixture";
import { CurrencyFactory } from "@modules/shared/domain/value-object/currency/currency.factory";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { AuthModule } from "@modules/auth/auth.module";
import { SharedModule } from "@modules/shared/shared.module";

describe("ProductAdmController", () => {
  let controller: ProductAdmController;

  beforeAll(() => {
    const factory = CurrencyFactory.getInstance();
    factory.register("brl", BRLCurrency);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(registerDataSource("memory")), AuthModule, SharedModule, ProductAdmModule],
      controllers: [ProductAdmController],
      providers: [CreateProductUseCase, UpdateProductUseCase],
    }).compile();

    controller = module.get<ProductAdmController>(ProductAdmController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("creates a product", async () => {
    const output = await controller.create({ name: "Product 1", price: 50, currency: "brl" });
    expect(output.id).toBeDefined();
    expect(output.name).toBe("Product 1");
    expect(output.price).toBe(50);
  });

  it("updates a product", async () => {
    const product = await controller.create({ name: "Product 1", price: 50, currency: "brl" });
    expect(product.id).toBeDefined();

    const output = await controller.update(product.id, { name: "Product 1 updated", price: 100, currency: "brl" });
    expect(output.price).toBe(100);
    expect(output.id).toBe(product.id);
    expect(output.name).toBe("Product 1 updated");
  });
});
