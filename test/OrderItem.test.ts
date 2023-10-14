import { OrderItem } from "../src/Domain/Entity/OrderItem";
import { Product } from "../src/Domain/Entity/Product";
import { Dimensions } from "../src/Domain/ValueObjects/Dimensions";
import { Id } from "../src/Domain/ValueObjects/Id";


describe("OderItem", () => {
    it("Should calculate total", () => {
        const product = new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0);
        const item = new OrderItem(product, 2);
        expect(item.total).toEqual(20)
    });
});