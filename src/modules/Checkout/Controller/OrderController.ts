import { PlaceOrderUseCase } from "../../../modules/Checkout/UseCase/PlaceOrderUseCase";
import { Http } from "../../../Infra/@shared/Http/Http";
import { Controller } from "../../../Infra/@shared/Controller/Controller";
import { inject } from "../../../Infra/@shared/DI/Registry";

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
