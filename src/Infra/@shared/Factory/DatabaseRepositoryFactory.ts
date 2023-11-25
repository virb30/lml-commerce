import { RepositoryFactory } from "../../../Domain/@shared/Factory/RepositoryFactory";
import { CouponRepository } from "../../../Domain/Checkout/Repository/CouponRepository";
import { OrderRepository } from "../../../Domain/Checkout/Repository/OrderRepository";
import { ProductRepository } from "../../../Domain/Product/Repository/ProductRepository";
import { StockEntryRepository } from "../../../Domain/Stock/Repository/StockEntryRepository";
import { Connection } from "../Database/Connection";
import { CouponRepositoryDatabase } from "../../Checkout/Repository/Database/CouponRepositoryDatabase";
import { OrderRepositoryDatabase } from "../../Checkout/Repository/Database/OrderRepositoryDatabase";
import { ProductRepositoryDatabase } from "../../Product/Repository/Database/ProductRepositoryDatabase";
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
