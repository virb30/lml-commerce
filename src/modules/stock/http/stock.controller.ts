import { Controller, Get } from "@nestjs/common";
import { GetStockUseCase } from "../usecase/get-stock.usecase";

@Controller("stock")
export class StockController {
  constructor(private readonly getStockUsecase: GetStockUseCase) {}

  @Get()
  async getStock() {
    return this.getStockUsecase.execute({ productId: "1" });
  }
}
