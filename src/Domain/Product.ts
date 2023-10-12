import { Dimensions } from './ValueObjects/Dimensions'
import { Id } from './ValueObjects/Id'

export class Product {
    constructor(
        public readonly id: Id, 
        public readonly name: string, 
        public readonly price: number, 
        public readonly dimensions: Dimensions, 
        public readonly weight: number
    ) {
    }

    public getDensity(): number
    {
        if (this.dimensions && this.weight) {
            return this.weight / this.dimensions.getVolume();
        } else {
            return 0;
        }
    }
}