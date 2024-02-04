import { Order } from "../Entity/Order";
import { Id } from "../../../@shared/Domain/ValueObject/Id";
import { Email } from "../../../@shared/Domain/ValueObject/Email";

export interface OrderRepository {
  save(order: Order): Promise<void>;
  getById(id: Id): Promise<Order>;
  findByEmail(email: Email, page: number, limit: number): Promise<Order[]>;
  clear(): Promise<void>;
}
