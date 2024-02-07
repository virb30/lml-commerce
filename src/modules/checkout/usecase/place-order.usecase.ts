import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Order } from "../domain/entity/order";
import { Id } from "src/modules/shared/domain/value-object/id";
import { Email } from "src/modules/shared/domain/value-object/email";
import { OrderRepository } from "../domain/repository/order.repository.interface";
import { CouponRepository } from "../domain/repository/coupon.repository.interface";
import { RepositoryFactory } from "src/modules/shared/domain/factory/repository-factory.interface";
import { OrderPlaced } from "../domain/event/order-placed";
import { Queue } from "../../queue/queue.interface";

export class PlaceOrderUseCase {
  private productRepository: ProductRepository;
  private orderRepository: OrderRepository;
  private couponRepository: CouponRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    private queue: Queue,
  ) {
    this.productRepository = repositoryFactory.makeProductRepository();
    this.orderRepository = repositoryFactory.makeOrderRepository();
    this.couponRepository = repositoryFactory.makeCouponRepository();
  }

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
    const orderPlaced = new OrderPlaced({
      orderId: order.id.value,
      items: order.items.map((item) => {
        return {
          productId: item.productId,
          amount: item.amount,
        };
      }),
      total: order.total,
    });
    await this.queue.publish(orderPlaced);

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
