import { OrderRepositoryDatabase } from "../src/Infra/Repository/OrderRepositoryDatabase";
import { Order } from "../src/Domain/Entity/Order";
import { Product } from "../src/Domain/Entity/Product";
import { Id } from "../src/Domain/ValueObjects/Id";
import { Email } from "../src/Domain/ValueObjects/Email";
import { Dimensions } from "../src/Domain/ValueObjects/Dimensions";
import { getDbConnectionString } from "../src/config";
import { MysqlConnectionAdapter } from "../src/Infra/Database/MysqlConnectionAdapter";

describe("Order repository", () => {
  const connection = new MysqlConnectionAdapter(getDbConnectionString());
  const orderRepositoryDatabase = new OrderRepositoryDatabase(connection);

  beforeEach(async () => {
    await orderRepositoryDatabase.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Should save order", async () => {
    const order = new Order(new Id("1"), new Email("cliente@email.com"), new Date("2023-01-01T00:00:00"), 1);
    order.addItem(new Product(new Id("1"), "Bicicleta", 20.0, new Dimensions(10, 10, 2), 50), 1);

    await orderRepositoryDatabase.save(order);

    const orderData = await orderRepositoryDatabase.getById(new Id("1"));

    expect(orderData).toEqual(order);
  });
});
