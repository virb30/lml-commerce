import { PlaceOrderUseCase, PlaceOrderUseCaseInput } from "../../Application/PlaceOrderUseCase";
import { CouponRepository } from "../../Domain/Repository/CouponRepository";
import { OrderRepository } from "../../Domain/Repository/OrderRepository";
import { ProductRepository } from "../../Domain/Repository/ProductRepository";
import { Http } from "../Http/Http";
import { Controller } from "./Controller";

export class OrderController extends Controller {
  constructor(
    http: Http,
    orderRepository: OrderRepository,
    productRepository: ProductRepository,
    couponRepository: CouponRepository,
  ) {
    super();
    http.on("POST", "/orders", async (params, body) => {
      const usecase = new PlaceOrderUseCase(productRepository, orderRepository, couponRepository);

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
