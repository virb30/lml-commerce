import { ProductRepository } from "../Domain/Repository/ProductRepository";
import { Order } from "../Domain/Entity/Order";
import { Id } from "../Domain/ValueObjects/Id";
import { Email } from "../Domain/ValueObjects/Email";
import { OrderRepository } from "../Domain/Repository/OrderRepository";
import { CouponRepository } from "../Domain/Repository/CouponRepository";

export class PlaceOrderUseCase {
  constructor(
    private productRepository: ProductRepository,
    private orderRepository: OrderRepository,
    private couponRepository: CouponRepository,
  ) {}

  public async execute(input: PlaceOrderUseCaseInput): Promise<PlaceOrderUseCaseOutput> {
    const order = new Order(new Id(), new Email(input.email), input.date ?? new Date(), 1);

    for (const item of input.items) {
      const product = await this.productRepository.getById(new Id(item.id));
      order.addItem(product, item.amount);
    }

    if (input.coupon) {
      const coupon = await this.couponRepository.getByCode(input.coupon);
      order.applyCoupon(coupon);
    }

    await this.orderRepository.save(order);

    return {
      total: order.total,
    };
  }
}

export type PlaceOrderUseCaseInput = {
  email: string;
  items: { id: string; amount: number }[];
  coupon?: string;
  date?: Date;
};

export type PlaceOrderUseCaseOutput = {
  total: number;
};
