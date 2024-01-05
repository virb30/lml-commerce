import { PlaceOrderUseCase } from "../../../Application/Checkout/PlaceOrderUseCase";
import { Http } from "../../@shared/Http/Http";
import { Controller } from "../../@shared/Controller/Controller";
import { inject } from "../../@shared/DI/Registry";

export class OrderController extends Controller {
  @inject("httpServer")
  http?: Http;

  @inject("placeOrder")
  placeOrder?: PlaceOrderUseCase;

  constructor() {
    super();
    this.http?.on("POST", "/orders", async (params, body) => {
      const input = {
        email: body.email,
        items: body.items.map((item: ItemInput) => ({
          id: item.product_id,
          amount: item.amount,
        })),
      };

      const output = await this.placeOrder?.execute(input);
      const data = {
        total: output?.total,
      };

      return this.created(data);
    });
  }
}

type ItemInput = {
  product_id: string;
  amount: number;
};
