import { CouponRepository } from "../../Checkout/Repository/CouponRepository";
import { OrderRepository } from "../../Checkout/Repository/OrderRepository";
import { ProductRepository } from "../../Product/Repository/ProductRepository";
import { StockEntryRepository } from "../../Stock/Repository/StockEntryRepository";

export interface RepositoryFactory {
  makeOrderRepository(): OrderRepository;
  makeProductRepository(): ProductRepository;
  makeCouponRepository(): CouponRepository;
  makeStockEntryRepository(): StockEntryRepository;
}
