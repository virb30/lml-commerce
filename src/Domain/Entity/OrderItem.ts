
import { Id } from "../ValueObjects/Id";
export class OrderItem{

    constructor(
        public productId: Id,
        public price: number,
        public amount: number
    ){
        
    }

    public get total(){
        
        return this.price * this.amount;
    }
}