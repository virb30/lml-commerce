import { Controller, Get, Param } from "@nestjs/common";
import { GetStockUseCase } from "../usecase/get-stock.usecase";

@Controller("stock")
export class StockController {
  constructor(private readonly getStockUsecase: GetStockUseCase) {}

  @Get(":productId")
  async getStock(@Param("productId") productId: string) {
    return this.getStockUsecase.execute({ productId });
  }
}
