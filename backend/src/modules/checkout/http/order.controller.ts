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
        id: item.product_id,
        amount: item.amount,
      })),
    };
    const output = await this.placeOrderUsecase.execute(input);
    const data = {
      total: output?.total,
    };

    return data;
  }
}

type ItemInput = {
  product_id: string;
  amount: number;
};
