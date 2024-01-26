import { RepositoryFactory } from "../../../Domain/@shared/Factory/RepositoryFactory";
import { CouponRepository } from "../../../modules/Checkout/Domain/Repository/CouponRepository";
import { OrderRepository } from "../../../modules/Checkout/Domain/Repository/OrderRepository";
import { ProductRepository } from "../../../modules/Checkout/Domain/Repository/ProductRepository";
import { StockEntryRepository } from "../../../modules/Stock/Domain/Repository/StockEntryRepository";
import { CouponRepositoryMemory } from "../../../modules/Checkout/Repository/Memory/CouponRepositoryMemory";
import { OrderRepositoryMemory } from "../../../modules/Checkout/Repository/Memory/OrderRepositoryMemory";
import { ProductRepositoryMemory } from "../../../modules/Checkout/Repository/Memory/ProductRepositoryMemory";
import { StockEntryRepositoryMemory } from "../../../modules/Stock/Repository/Memory/StockEntryRepositoryMemory";

export class MemoryRepositoryFactory implements RepositoryFactory {
  private orderRepository?: OrderRepository;
  private productRepository?: ProductRepository;
  private couponRepository?: CouponRepository;
  private stockEntryRepository?: StockEntryRepository;

  public makeOrderRepository(): OrderRepository {
    if (!this.orderRepository) {
      this.orderRepository = new OrderRepositoryMemory();
    }
    return this.orderRepository;
  }

  public makeProductRepository(): ProductRepository {
    if (!this.productRepository) {
      this.productRepository = new ProductRepositoryMemory();
    }
    return this.productRepository;
  }

  public makeCouponRepository(): CouponRepository {
    if (!this.couponRepository) {
      this.couponRepository = new CouponRepositoryMemory();
    }
    return this.couponRepository;
  }

  public makeStockEntryRepository(): StockEntryRepository {
    if (!this.stockEntryRepository) {
      this.stockEntryRepository = new StockEntryRepositoryMemory();
    }
    return this.stockEntryRepository;
  }
}
