import { Test, TestingModule } from "@nestjs/testing";
import { USE_CASES } from "./stock.providers";
import { GetStockUseCase } from "./usecase/get-stock.usecase";
import { StockModule } from "./stock.module";
import { Connection } from "../database/connection/connection.interface";
import { CONNECTION_PROVIDER_TOKEN } from "../database/database.providers";

describe("Usecase", () => {
  let provider: any;
  let module: TestingModule;
  let connection: Connection;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [StockModule],
    }).compile();

    connection = module.get(CONNECTION_PROVIDER_TOKEN);
  });

  afterAll(async () => {
    await connection.close();
  });

  it("provides GetStockUseCase", () => {
    provider = module.get(USE_CASES.GET_STOCK_USECASE.provide);

    expect(provider).toBeDefined();
    expect(provider).toBeInstanceOf(GetStockUseCase);
  });
});
