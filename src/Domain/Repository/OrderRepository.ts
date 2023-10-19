import { Order } from "../Entity/Order";

export interface OrderRepository {
  save(order: Order): Promise<void>;
}
