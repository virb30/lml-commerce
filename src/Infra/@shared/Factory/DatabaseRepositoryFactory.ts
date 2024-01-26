import { RepositoryFactory } from "../../../Domain/@shared/Factory/RepositoryFactory";
import { CouponRepository } from "../../../modules/Checkout/Domain/Repository/CouponRepository";
import { OrderRepository } from "../../../modules/Checkout/Domain/Repository/OrderRepository";
import { ProductRepository } from "../../../modules/Checkout/Domain/Repository/ProductRepository";
import { StockEntryRepository } from "../../../modules/Stock/Domain/Repository/StockEntryRepository";
import { Connection } from "../Database/Connection";
import { CouponRepositoryDatabase } from "../../../modules/Checkout/Repository/Database/CouponRepositoryDatabase";
import { OrderRepositoryDatabase } from "../../../modules/Checkout/Repository/Database/OrderRepositoryDatabase";
import { ProductRepositoryDatabase } from "../../../modules/Checkout/Repository/Database/ProductRepositoryDatabase";
import { StockEntryRepositoryDatabase } from "../../../modules/Stock/Repository/Database/StockEntryRepositoryDatabase";

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
