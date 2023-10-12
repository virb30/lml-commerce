import { Id } from "../src/Domain/ValueObjects/Id";

describe("Id tests", () => {
    it("should create id with value", () => {
        const id = new Id('1');
        expect(id.value).toEqual("1");
    });

    it("should create id without value", () => {
        const id = new Id();
        expect(id.value).toBeDefined();
    });
});