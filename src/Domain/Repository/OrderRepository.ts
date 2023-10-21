import { Order } from "../Entity/Order";
import { Id } from "../ValueObjects/Id";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  getById(id: Id): Promise<Order>;
  clear(): Promise<void>;
}
