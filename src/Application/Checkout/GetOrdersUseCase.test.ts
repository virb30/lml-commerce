import { Connection } from "mysql2/typings/mysql/lib/Connection";
import { Email } from "../../Domain/@shared/ValueObject/Email";
import { Id } from "../../Domain/@shared/ValueObject/Id";
import { Order } from "../../Domain/Checkout/Entity/Order";
import { OrderCode } from "../../Domain/Checkout/ValueObject/OrderCode";
import { Product } from "../../Domain/Product/Entity/Product";
import { Dimensions } from "../../Domain/Product/ValueObject/Dimensions";
import { OrderRepositoryDatabase } from "../../Infra/Checkout/Repository/Database/OrderRepositoryDatabase";
import { GetOrdersUseCase } from "./GetOrdersUseCase";
import { getDbConnectionString } from "../../config";
import { MysqlConnectionAdapter } from "../../Infra/@shared/Database/MysqlConnectionAdapter";

describe("GetOrdersUseCase tests", () => {
  const connection = new MysqlConnectionAdapter(getDbConnectionString());
  const orderRepository = new OrderRepositoryDatabase(connection);

  beforeEach(async () => {
    await orderRepository.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  /**
   * Buscas os pedidos por e-mail
   * Retorna uma lista de pedidos com as informações: code do pedido, total, date
   * Pagine 1,2,3
   *
   * email
   * Pag: 1
   * limit: 10
   *
   */
  it("should returns a list of orders", async () => {
    const order01 = new Order(new Id("1"), new Email("email@1234.com"), new Date("2023-01-01T00:00:00"), 1);
    const product = new Product(new Id("1"), "Fone de ouvido", 10.0, new Dimensions(10, 20, 30), 0);
    order01.addItem(product, 1);

    const ordersBase = [
      {
        order: order01,
        code: new OrderCode(new Date("2023-01-01T00:00:00"), 1).value,
      },
      {
        order: new Order(new Id("2"), new Email("email@1234.com"), new Date("2023-02-02T00:00:00"), 2),
        code: new OrderCode(new Date("2023-02-02T00:00:00"), 2).value,
      },
      {
        order: new Order(new Id("3"), new Email("email@1234.com"), new Date("2023-03-03T00:00:00"), 3),
        code: new OrderCode(new Date("2023-03-03T00:00:00"), 3).value,
      },
      {
        order: new Order(new Id("4"), new Email("email@1234.com"), new Date("2023-04-04T00:00:00"), 4),
        code: new OrderCode(new Date("2023-04-04T00:00:00"), 4).value,
      },
      {
        order: new Order(new Id("5"), new Email("email@1234.com"), new Date("2023-05-05T00:00:00"), 5),
        code: new OrderCode(new Date("2023-05-05T00:00:00"), 5).value,
      },
    ];

    ordersBase.forEach((orderBase) => orderRepository.save(orderBase.order));
    const getOrdersUseCase = new GetOrdersUseCase(orderRepository);

    const orders = await getOrdersUseCase.execute({
      email: "email@1234.com",
      page: 1,
      limit: 2,
    });

    expect(orders.length).toBe(2);

    expect(orders[0].code).toEqual(ordersBase[0].order.code.value);
    expect(orders[0].date).toEqual(ordersBase[0].order.date);
    expect(orders[0].total).toEqual(ordersBase[0].order.total);

    expect(orders[1].code).toEqual(ordersBase[1].order.code.value);
    expect(orders[1].date).toEqual(ordersBase[1].order.date);
    expect(orders[1].total).toEqual(ordersBase[1].order.total);
  });
});
