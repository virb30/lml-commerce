import { GetOrderUseCase } from "./GetOrderUseCase";
import { Order } from "../../Domain/Checkout/Entity/Order";
import { Product } from "../../Domain/Product/Entity/Product";
import { Dimensions } from "../../Domain/Product/ValueObject/Dimensions";
import { Email } from "../../Domain/@shared/ValueObject/Email";
import { Id } from "../../Domain/@shared/ValueObject/Id";
import { OrderRepositoryMemory } from "../../Infra/Checkout/Repository/Memory/OrderRepositoryMemory";

describe("GetOrderUseCase tests", () => {
  it("should get order by id", async () => {
    const orderRepositoryMemory = new OrderRepositoryMemory();
    const order = new Order(new Id("1"), new Email("cliente@email.com"), new Date("2023-01-01T00:00:00"), 1);
    const product = new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0);
    order.addItem(product, 1);
    await orderRepositoryMemory.save(order);

    const getOrderUseCase = new GetOrderUseCase(orderRepositoryMemory);
    const savedOrder = await getOrderUseCase.execute({ id: "1" });

    expect(order.id).toEqual(savedOrder.id)
  });

  it("should throw exception if order not found", async () => {
    expect(async () => {
      const orderRepositoryMemory = new OrderRepositoryMemory();

      const getOrderUseCase = new GetOrderUseCase(orderRepositoryMemory);
      await getOrderUseCase.execute({ id: "Invalid ID" });
    }).rejects.toThrow(new Error("Order not found"));
  });
});
