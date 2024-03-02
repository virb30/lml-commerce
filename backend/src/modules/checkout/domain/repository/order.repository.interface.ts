import { Order } from "../entity/order";
import { Id } from "@modules/shared/domain/value-object/id";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  getById(id: Id): Promise<Order>;
  clear(): Promise<void>;
}
