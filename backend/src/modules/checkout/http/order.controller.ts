import { Controller, Post, Body } from "@nestjs/common";
import { PlaceOrderUseCase } from "../usecase/place-order.usecase";

@Controller("orders")
export class OrderController {
  constructor(private readonly placeOrderUsecase: PlaceOrderUseCase) {}

  @Post()
  async create(@Body() body: any) {
    const input = {
      email: body.email,
      items: body.items.map((item: ItemInput) => ({
        id: item.productId,
        amount: item.amount,
      })),
    };
    const output = await this.placeOrderUsecase.execute(input);
    return {
      total: output?.total,
      freight: output?.freight,
    };
  }
}

type ItemInput = {
  productId: string;
  amount: number;
};
