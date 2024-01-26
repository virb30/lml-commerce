import { ProductRepository } from "../Domain/Repository/ProductRepository";
import { Order } from "../Domain/Entity/Order";
import { Id } from "../../../Domain/@shared/ValueObject/Id";
import { Email } from "../../../Domain/@shared/ValueObject/Email";
import { OrderRepository } from "../Domain/Repository/OrderRepository";
import { CouponRepository } from "../Domain/Repository/CouponRepository";
import { RepositoryFactory } from "../../../Domain/@shared/Factory/RepositoryFactory";
import { OrderPlaced } from "../Domain/Event/OrderPlaced";
import { Queue } from "../../../Infra/@shared/Queue/Queue";

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
