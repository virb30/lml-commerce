import { ProductRepository } from "../domain/repository/product.repository.interface";
import { Order } from "../domain/entity/order";
import { Id } from "@modules/shared/domain/value-object/id";
import { Email } from "@modules/shared/domain/value-object/email";
import { OrderRepository } from "../domain/repository/order.repository.interface";
import { CouponRepository } from "../domain/repository/coupon.repository.interface";
import { RepositoryFactory } from "@modules/checkout/domain/factory/repository-factory.interface";
import { OrderPlaced } from "../domain/event/order-placed";
import { Queue } from "../../queue/queue.interface";
import { CalculateFreightGateway } from "../gateway/calculate-freight.gateway.interface";

export class PlaceOrderUseCase {
  private productRepository: ProductRepository;
  private orderRepository: OrderRepository;
  private couponRepository: CouponRepository;

  constructor(
    repositoryFactory: RepositoryFactory,
    private queue: Queue,
    private calculateFreightGateway: CalculateFreightGateway,
  ) {
    this.productRepository = repositoryFactory.makeProductRepository();
    this.orderRepository = repositoryFactory.makeOrderRepository();
    this.couponRepository = repositoryFactory.makeCouponRepository();
  }

  public async execute(input: PlaceOrderUseCaseInput): Promise<PlaceOrderUseCaseOutput> {
    const sequence = await this.orderRepository.getNextSequence();
    const order = Order.create({ email: new Email(input.email), date: input.date ?? new Date(), sequence });

    const orderItems = [];
    for (const item of input.items) {
      const product = await this.productRepository.getById(new Id(item.id));
      order.addItem(product, item.amount);
      orderItems.push({ volume: product.getVolume(), density: product.getDensity(), quantity: item.amount });
    }
    const freight = await this.calculateFreightGateway.calculate(orderItems);
    order.changeFreight(freight);

    if (input.coupon) {
      const coupon = await this.couponRepository.getByCode(input.coupon);
      order.applyCoupon(coupon);
    }

    await this.orderRepository.save(order);
    const orderPlaced = new OrderPlaced({
      orderId: order.id.value,
      items: order.items.map((item) => {
        return {
          productId: item.productId.value,
          amount: item.amount,
        };
      }),
      total: order.total,
    });
    await this.queue.publish(orderPlaced);

    return {
      id: order.id.value,
      code: order.code.value,
      total: order.total,
      freight: order.freight,
    };
  }
}

export type PlaceOrderUseCaseInput = {
  email: string;
  items: { id: string; amount: number }[];
  coupon?: string;
  date?: Date;
  currency?: string;
};

export type PlaceOrderUseCaseOutput = {
  id: string;
  code: string;
  total: number;
  freight?: number;
};
