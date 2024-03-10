import { Controller, Get, Param } from "@nestjs/common";
import { GetStockUseCase } from "../usecase/get-stock.usecase";
import { ApiNotFoundResponse, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { GetStockOutputDto } from "./dtos/get-stock.output.dto";
import { GetStockPresenter } from "./presenters/get-stock.presenter";

@Controller("stock")
export class StockController {
  constructor(private readonly getStockUsecase: GetStockUseCase) {}

  @Get(":productId")
  @ApiParam({ name: "productId", description: "Id of the product to check stock" })
  @ApiOkResponse({ type: GetStockOutputDto })
  async getStock(@Param("productId") productId: string): Promise<GetStockOutputDto> {
    const output = await this.getStockUsecase.execute({ productId });
    return GetStockPresenter.toJson(output);
  }
}
