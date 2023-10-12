import { Dimensions } from '../src/Domain/ValueObjects/Dimensions'
import { Id } from '../src/Domain/ValueObjects/Id'
import { Product } from '../src/Domain/Product'

describe("Product", () => {
    it("Should create a product", () => {
        const product = new Product(new Id('1'), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0);
        expect(product.id.value).toEqual("1");
        expect(product.name).toEqual("Fone de ouvido");
        expect(product.price).toBe(10.0);
        expect(product.getDensity()).toBe(0);
    });
});