import { PlaceOrderUseCaseOutput } from "@modules/checkout/usecase/place-order.usecase";
import { PlaceOrderOutputDto } from "../dtos/place-order.output.dto";

export class PlaceOrderPresenter {
  static toJson(dto: PlaceOrderUseCaseOutput): PlaceOrderOutputDto {
    return {
      id: dto.id,
      code: dto.code,
      total: dto.total,
      freight: dto.freight,
    };
  }
}
