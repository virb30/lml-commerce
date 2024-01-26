import { CouponRepository } from "../../../Checkout/Domain/Repository/CouponRepository";
import { OrderRepository } from "../../../Checkout/Domain/Repository/OrderRepository";
import { ProductRepository } from "../../../Checkout/Domain/Repository/ProductRepository";
import { StockEntryRepository } from "../../../Stock/Domain/Repository/StockEntryRepository";

export interface RepositoryFactory {
  makeOrderRepository(): OrderRepository;
  makeProductRepository(): ProductRepository;
  makeCouponRepository(): CouponRepository;
  makeStockEntryRepository(): StockEntryRepository;
}
