
import { Order } from "../../Domain/Entity/Order";
import { OrderRepository } from "../../Domain/Repository/OrderRepository";

export class OrderRepositoryMemory implements OrderRepository {
    private orders: Order[] = [];

    public async save(order: Order): Promise<void> {
        this.orders.push(order)
    }
    
}