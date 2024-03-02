import { CouponRepository } from "@modules/checkout/domain/repository/coupon.repository.interface";
import { OrderRepository } from "@modules/checkout/domain/repository/order.repository.interface";
import { ProductRepository } from "@modules/checkout/domain/repository/product.repository.interface";
import { StockEntryRepository } from "@modules/stock/domain/repository/stock-entry.repository.interface";

export interface RepositoryFactory {
  makeOrderRepository(): OrderRepository;
  makeProductRepository(): ProductRepository;
  makeCouponRepository(): CouponRepository;
  makeStockEntryRepository(): StockEntryRepository;
}
