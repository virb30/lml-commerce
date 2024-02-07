import { Test, TestingModule } from "@nestjs/testing";
import { StockController } from "./stock.controller";
import { StockModule } from "../stock.module";

describe("StockController", () => {
  let controller: StockController;
  let module: TestingModule;

  afterEach(async () => {
    await module.close();
  });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [StockModule],
    }).compile();

    controller = module.get<StockController>(StockController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
