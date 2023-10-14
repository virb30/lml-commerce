import { ProductRepository } from "../../Domain/Repository/ProductRepository";
import { Product } from "../../Domain/Entity/Product";
import { Id } from "../../Domain/ValueObjects/Id";

export class ProductRepositoryMemory implements ProductRepository {
    private products: Product[] = [];

    public async getById(id: Id): Promise<Product> {
        const product = this.products.find((product) => {
            return product.id.value === id.value
        })

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    public async save(product: Product): Promise<void> {
        this.products.push(product)
    }
    
}