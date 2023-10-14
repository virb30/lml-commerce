
import {Product} from "./Product"
export class OrderItem{

    constructor(public product: Product,public amount:number){
        
    }

    public get total(){
        
        return this.product.price * this.amount;
    }
}