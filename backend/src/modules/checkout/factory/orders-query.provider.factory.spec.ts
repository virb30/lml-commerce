import { dbConfig } from "@modules/database/connection/mysql/config";
import { MysqlConnectionAdapter } from "@modules/database/connection/mysql/mysql-connection.adapter";
import { MemoryOrdersQuery } from "../query/memory/memory-orders.query";
import { OrdersQueryProviderFactory } from "./orders-query.provider.factory";
import { DatabaseOrdersQuery } from "../query/database/database-orders.query";

describe("QueryProviderFactory tests", () => {
  const options = {
    connection: new MysqlConnectionAdapter(dbConfig),
  };

  it("returns MemoryOrdersQuery", () => {
    const factory = new OrdersQueryProviderFactory(options);
    const query = factory.make("memory");
    expect(query).toBeInstanceOf(MemoryOrdersQuery);
  });
  it("returns DatabaseOrdersQuery", () => {
    const factory = new OrdersQueryProviderFactory(options);
    const query = factory.make("adapter");
    expect(query).toBeInstanceOf(DatabaseOrdersQuery);
  });
});
