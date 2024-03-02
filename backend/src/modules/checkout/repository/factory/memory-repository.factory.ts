import { RepositoryFactory } from "../../domain/factory/repository-factory.interface";
import { CouponRepository } from "../../domain/repository/coupon.repository.interface";
import { OrderRepository } from "../../domain/repository/order.repository.interface";
import { ProductRepository } from "../../domain/repository/product.repository.interface";
import { StockEntryRepository } from "../../../stock/domain/repository/stock-entry.repository.interface";
import { CouponRepositoryMemory } from "../memory/coupon.repository";
import { OrderRepositoryMemory } from "../memory/order.repository";
import { ProductRepositoryMemory } from "../memory/product.repository";
import { StockEntryRepositoryMemory } from "../../../stock/repository/memory/stock-entry.repository";

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
