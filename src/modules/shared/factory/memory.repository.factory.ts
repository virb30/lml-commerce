import { RepositoryFactory } from "../domain/factory/repository-factory.interface";
import { CouponRepository } from "../../checkout/domain/repository/coupon.repository.interface";
import { OrderRepository } from "../../checkout/domain/repository/order.repository.interface";
import { ProductRepository } from "../../checkout/domain/repository/product.repository.interface";
import { StockEntryRepository } from "../../stock/domain/repository/stock-entry.repository.interface";
import { CouponRepositoryMemory } from "../../checkout/repository/memory/coupon.repository";
import { OrderRepositoryMemory } from "../../checkout/repository/memory/order.repository";
import { ProductRepositoryMemory } from "../../checkout/repository/memory/product.repository";
import { StockEntryRepositoryMemory } from "../../stock/repository/memory/stock-entry.repository";

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
