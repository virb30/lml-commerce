import { RepositoryFactory } from "../../Domain/Factory/RepositoryFactory";
import { CouponRepository } from "../../Domain/Repository/CouponRepository";
import { OrderRepository } from "../../Domain/Repository/OrderRepository";
import { ProductRepository } from "../../Domain/Repository/ProductRepository";
import { StockEntryRepository } from "../../Domain/Repository/StockEntryRepository";
import { CouponRepositoryMemory } from "../Repository/CouponRepositoryMemory";
import { OrderRepositoryMemory } from "../Repository/OrderRepositoryMemory";
import { ProductRepositoryMemory } from "../Repository/ProductRepositoryMemory";
import { StockEntryRepositoryMemory } from "../Repository/StockEntryRepositoryMemory";

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
