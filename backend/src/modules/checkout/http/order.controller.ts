import { Controller, Post, Body } from "@nestjs/common";
import { PlaceOrderUseCase } from "../usecase/place-order.usecase";
import { ApiBody, ApiCreatedResponse, ApiExtraModels } from "@nestjs/swagger";
import { OrderItemInputDto, PlaceOrderInputDto } from "./dtos/place-order.input.dto";
import { PlaceOrderPresenter } from "./presenters/place-order.presenter";
import { PlaceOrderOutputDto } from "./dtos/place-order.output.dto";

@Controller("orders")
export class OrderController {
  constructor(private readonly placeOrderUsecase: PlaceOrderUseCase) {}

  @Post()
  @ApiExtraModels(OrderItemInputDto)
  @ApiBody({ type: PlaceOrderInputDto })
  @ApiCreatedResponse({ type: PlaceOrderOutputDto, description: "Order placed data" })
  async create(@Body() body: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    const input = {
      email: body.email,
      items: body.items.map((item) => ({
        id: item.productId,
        amount: item.amount,
      })),
    };
    const output = await this.placeOrderUsecase.execute(input);
    return PlaceOrderPresenter.toJson(output);
  }
}
