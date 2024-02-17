import { ProviderFactory } from "src/modules/shared/factory/provider.factory";
import { OrdersQuery } from "../query/orders.query.interface";
import { Connection } from "src/modules/database/connection/connection.interface";
import { DatabaseOrdersQuery } from "../query/database/database-orders.query";
import { MemoryOrdersQuery } from "../query/memory/memory-orders.query";

export class OrdersQueryProviderFactory extends ProviderFactory<OrdersQuery> {
  constructor(options: OrdersQueryProviderFactoryOptions) {
    const mapper = {
      adapter: {
        className: DatabaseOrdersQuery,
        options: {
          connection: options.connection,
        },
      },
      memory: {
        className: MemoryOrdersQuery,
      },
    };
    super(mapper);
  }
}

type OrdersQueryProviderFactoryOptions = {
  connection: Connection;
};
