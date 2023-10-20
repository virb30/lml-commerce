import { Dimensions } from "../src/Domain/ValueObjects/Dimensions";
import { Id } from "../src/Domain/ValueObjects/Id";
import { Product } from "../src/Domain/Entity/Product";

describe("Product", () => {
    it("Should create a product", () => {
        const product = new Product(new Id('1'), "Fone de ouvido", 10.0, new Dimensions(1, 2, 3), 6);
        expect(product.id.value).toEqual("1");
        expect(product.name).toEqual("Fone de ouvido");
        expect(product.price).toBe(10.0);
        expect(product.getDensity()).toBe(1);
        expect(product.getVolume()).toBe(6)
    });

    it("Should create a product without dimensions", () => {
        const product = new Product(new Id('1'), "Fone de ouvido", 10.0);
        expect(product.id.value).toEqual("1");
        expect(product.name).toEqual("Fone de ouvido");
        expect(product.price).toBe(10.0);
        expect(product.getDensity()).toBe(0);
        expect(product.getVolume()).toBe(0)
    });

    it("Should create a product without weight", () => {
        const product = new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(1, 2, 3));
        expect(product.id.value).toEqual("1");
        expect(product.name).toEqual("Fone de ouvido");
        expect(product.price).toBe(10.0);
        expect(product.getDensity()).toBe(0);
        expect(product.getVolume()).toBe(6);
    });

    it("Should not create a product with invalid weight", () => {
        expect(() => {
            new Product(new Id('1'), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), -1);
        }).toThrow(new Error("Invalid weight"));
    });
});
