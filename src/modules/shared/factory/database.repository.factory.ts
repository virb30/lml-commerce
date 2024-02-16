import { RepositoryFactory } from "../domain/factory/repository-factory.interface";
import { CouponRepository } from "src/modules/checkout/domain/repository/coupon.repository.interface";
import { OrderRepository } from "src/modules/checkout/domain/repository/order.repository.interface";
import { ProductRepository } from "src/modules/checkout/domain/repository/product.repository.interface";
import { StockEntryRepository } from "src/modules/stock/domain/repository/stock-entry.repository.interface";
import { Connection } from "../../database/connection/connection.interface";
import { CouponRepositoryDatabase } from "src/modules/checkout/repository/database/coupon.repository";
import { OrderRepositoryDatabase } from "src/modules/checkout/repository/database/order.repository";
import { ProductRepositoryDatabase } from "src/modules/checkout/repository/database/product.repository";
import { StockEntryRepositoryDatabase } from "src/modules/stock/repository/database/stock-entry.repository";

export class DatabaseRepositoryFactory implements RepositoryFactory {
  private orderRepository?: OrderRepository;
  private productRepository?: ProductRepository;
  private couponRepository?: CouponRepository;
  private stockEntryRepository?: StockEntryRepository;

  constructor(private connection: Connection) {}

  public makeOrderRepository(): OrderRepository {
    if (!this.orderRepository) {
      this.orderRepository = new OrderRepositoryDatabase(this.connection);
    }
    return this.orderRepository;
  }

  public makeProductRepository(): ProductRepository {
    if (!this.productRepository) {
      this.productRepository = new ProductRepositoryDatabase(this.connection);
    }
    return this.productRepository;
  }

  public makeCouponRepository(): CouponRepository {
    if (!this.couponRepository) {
      this.couponRepository = new CouponRepositoryDatabase(this.connection);
    }
    return this.couponRepository;
  }

  public makeStockEntryRepository(): StockEntryRepository {
    if (!this.stockEntryRepository) {
      this.stockEntryRepository = new StockEntryRepositoryDatabase(this.connection);
    }
    return this.stockEntryRepository;
  }
}
