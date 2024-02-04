import { GetOrderUseCase } from "./GetOrderUseCase";
import { Order } from "../Domain/Entity/Order";
import { Product } from "../Domain/Entity/Product";
import { Dimensions } from "../Domain/Entity/Dimensions";
import { Email } from "../../@shared/Domain/ValueObject/Email";
import { Id } from "../../@shared/Domain/ValueObject/Id";
import { OrderRepositoryMemory } from "../Repository/Memory/OrderRepositoryMemory";

describe("GetOrderUseCase tests", () => {
  const orderRepository = new OrderRepositoryMemory();
  let getOrderUseCase: GetOrderUseCase;

  const orderFixture = async () => {
    const order = new Order(new Id("1"), new Email("cliente@email.com"), new Date("2023-01-01T00:00:00"), 1);
    const product = new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0);
    order.addItem(product, 1);
    await orderRepository.save(order);
    return order;
  };

  beforeAll(() => {
    getOrderUseCase = new GetOrderUseCase(orderRepository);
  });

  beforeEach(async () => {
    await orderRepository.clear();
  });
  it("should get order by id", async () => {
    const order = await orderFixture();
    const output = await getOrderUseCase.execute({ id: "1" });
    expect(order.id).toEqual(output.id);
  });

  it("should throw exception if order not found", async () => {
    expect(async () => {
      await getOrderUseCase.execute({ id: "Invalid ID" });
    }).rejects.toThrow(new Error("Order not found"));
  });
});
