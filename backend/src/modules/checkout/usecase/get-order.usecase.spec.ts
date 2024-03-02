import { GetOrderUseCase } from "./get-order.usecase";
import { Order } from "../domain/entity/order";
import { Product } from "../domain/entity/product";
import { Dimensions } from "../domain/value-object/dimensions";
import { Email } from "@modules/shared/domain/value-object/email";
import { Id } from "@modules/shared/domain/value-object/id";
import { MemoryRepositoryFactory } from "../repository/factory/memory-repository.factory";

describe("GetOrderUseCase tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  const orderRepository = repositoryFactory.makeOrderRepository();
  let getOrderUseCase: GetOrderUseCase;

  const orderFixture = async () => {
    const order = new Order(new Id("1"), new Email("cliente@email.com"), new Date("2023-01-01T00:00:00"), 1);
    const product = new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0);
    order.addItem(product, 1);
    await orderRepository.save(order);
    return order;
  };

  beforeAll(() => {
    getOrderUseCase = new GetOrderUseCase(repositoryFactory);
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
