import { Order } from "../entity/order";
import { Id } from "src/modules/shared/domain/value-object/id";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  getById(id: Id): Promise<Order>;
  clear(): Promise<void>;
}
