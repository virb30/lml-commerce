import { RepositoryFactory } from "../Domain/Factory/RepositoryFactory";
import { CouponRepository } from "../../Checkout/Domain/Repository/CouponRepository";
import { OrderRepository } from "../../Checkout/Domain/Repository/OrderRepository";
import { ProductRepository } from "../../Checkout/Domain/Repository/ProductRepository";
import { StockEntryRepository } from "../../Stock/Domain/Repository/StockEntryRepository";
import { Connection } from "../../../Infra/Database/Connection";
import { CouponRepositoryDatabase } from "../../Checkout/Repository/Database/CouponRepositoryDatabase";
import { OrderRepositoryDatabase } from "../../Checkout/Repository/Database/OrderRepositoryDatabase";
import { ProductRepositoryDatabase } from "../../Checkout/Repository/Database/ProductRepositoryDatabase";
import { StockEntryRepositoryDatabase } from "../../Stock/Repository/Database/StockEntryRepositoryDatabase";

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
