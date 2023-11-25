import { Order } from "../Entity/Order";
import { Id } from "../../@shared/ValueObject/Id";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  getById(id: Id): Promise<Order>;
  clear(): Promise<void>;
}
