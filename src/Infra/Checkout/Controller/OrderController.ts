import { PlaceOrderUseCase, PlaceOrderUseCaseInput } from "../../../Application/Checkout/PlaceOrderUseCase";
import { RepositoryFactory } from "../../../Domain/@shared/Factory/RepositoryFactory";
import { Http } from "../../@shared/Http/Http";
import { Controller } from "../../@shared/Controller/Controller";
import { Queue } from "../../@shared/Queue/Queue";

export class OrderController extends Controller {
  constructor(http: Http, repositoryFactory: RepositoryFactory, queue: Queue) {
    super();
    http.on("POST", "/orders", async (params, body) => {
      const usecase = new PlaceOrderUseCase(repositoryFactory, queue);

      const input: PlaceOrderUseCaseInput = {
        email: body.email,
        items: body.items.map((item: { product_id: string; amount: number }) => ({
          id: item.product_id,
          amount: item.amount,
        })),
      };

      const output = await usecase.execute(input);
      const data = {
        total: output.total,
      };

      return this.created(data);
    });
  }
}
