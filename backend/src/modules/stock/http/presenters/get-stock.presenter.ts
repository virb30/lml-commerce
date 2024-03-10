import { GetStockOutput } from "@modules/stock/usecase/get-stock.usecase";
import { GetStockOutputDto } from "../dtos/get-stock.output.dto";

export class GetStockPresenter {
  static toJson(dto: GetStockOutput): GetStockOutputDto {
    return {
      total: dto.total,
    };
  }
}
