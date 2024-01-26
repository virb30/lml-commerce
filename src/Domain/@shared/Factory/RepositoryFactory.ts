import { CouponRepository } from "../../../modules/Checkout/Domain/Repository/CouponRepository";
import { OrderRepository } from "../../../modules/Checkout/Domain/Repository/OrderRepository";
import { ProductRepository } from "../../../modules/Checkout/Domain/Repository/ProductRepository";
import { StockEntryRepository } from "../../../modules/Stock/Domain/Repository/StockEntryRepository";

export interface RepositoryFactory {
  makeOrderRepository(): OrderRepository;
  makeProductRepository(): ProductRepository;
  makeCouponRepository(): CouponRepository;
  makeStockEntryRepository(): StockEntryRepository;
}
