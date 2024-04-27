import { GetOrderUseCase } from "./get-order.usecase";
import { Order } from "../domain/entity/order";
import { Product } from "../domain/entity/product";
import { Dimensions } from "../domain/value-object/dimensions";
import { Email } from "@modules/shared/domain/value-object/email";
import { Id } from "@modules/shared/domain/value-object/id";
import { MemoryRepositoryFactory } from "../repository/factory/memory-repository.factory";
import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { NotFoundError } from "@modules/shared/errors/not-found.error";

describe("GetOrderUseCase tests", () => {
  const repositoryFactory = new MemoryRepositoryFactory();
  const orderRepository = repositoryFactory.makeOrderRepository();
  let getOrderUseCase: GetOrderUseCase;

  const orderFixture = async () => {
    const order = Order.create({
      email: new Email("cliente@email.com"),
      date: new Date("2023-01-01T00:00:00"),
      sequence: 1,
    });
    order.addItem(
      Product.create({
        name: "Fone de ouvido",
        price: new BRLCurrency(10.0),
        dimensions: new Dimensions(1, 2, 3),
        weight: 0.5,
      }),
      1,
    );
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
    const output = await getOrderUseCase.execute({ id: order.id.value });
    expect(order.id).toEqual(output.id);
  });

  it("should throw exception if order not found", async () => {
    expect(async () => {
      await getOrderUseCase.execute({ id: "Invalid ID" });
    }).rejects.toThrowErrorTypeWithMessage(NotFoundError, "Order not found");
  });
});
