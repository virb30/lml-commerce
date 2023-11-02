import { CouponRepository } from "../Repository/CouponRepository";
import { OrderRepository } from "../Repository/OrderRepository";
import { ProductRepository } from "../Repository/ProductRepository";
import { StockEntryRepository } from "../Repository/StockEntryRepository";

export interface RepositoryFactory {
  makeOrderRepository(): OrderRepository;
  makeProductRepository(): ProductRepository;
  makeCouponRepository(): CouponRepository;
  makeStockEntryRepository(): StockEntryRepository;
}
