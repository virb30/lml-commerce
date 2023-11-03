import { RepositoryFactory } from "../../Domain/Factory/RepositoryFactory";
import { CouponRepository } from "../../Domain/Repository/CouponRepository";
import { OrderRepository } from "../../Domain/Repository/OrderRepository";
import { ProductRepository } from "../../Domain/Repository/ProductRepository";
import { StockEntryRepository } from "../../Domain/Repository/StockEntryRepository";
import { Connection } from "../Database/Connection";
import CouponRepositoryDatabase from "../Repository/CouponRepositoryDatabase";
import { OrderRepositoryDatabase } from "../Repository/OrderRepositoryDatabase";
import { ProductRepositoryDatabase } from "../Repository/ProductRepositoryDatabase";
import { StockEntryRepositoryDatabase } from "../Repository/StockEntryRepositoryDatabase";

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
