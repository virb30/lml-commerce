import { ProductRepository } from "../Domain/Repository/ProductRepository";
import { Order } from "../Domain/Entity/Order";
import { Id } from "../Domain/ValueObjects/Id";
import { Email } from "../Domain/ValueObjects/Email";

export class PlaceOrderUseCase {

    constructor(private productRepository: ProductRepository) {
        
    }

    public async execute(input: PlaceOrderUseCaseInput): Promise<PlaceOrderUseCaseOutput> {

        const order = new Order(new Id(), new Email(input.email), new Date(), 1);

        for(const item of input.items) {
            const product = await this.productRepository.getById(new Id(item.id));
            order.addItem(product, item.amount);
        }

        return {
            total: order.total
        }
    }
}

export type PlaceOrderUseCaseInput = {
    email: string;
    items: {id:string,amount:number}[];
}

export type PlaceOrderUseCaseOutput = {
    total: number;
}