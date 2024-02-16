import { GetProductsQuery } from "./query/get-products.query";
import { Connection } from "../database/connection/connection.interface";
import { CONNECTION_PROVIDER_TOKEN } from "../database/database.providers";

export const USE_CASES = {
  GET_PRODUCTS_QUERY: {
    provide: GetProductsQuery,
    useFactory: (connection: Connection) => {
      return new GetProductsQuery(connection);
    },
    inject: [CONNECTION_PROVIDER_TOKEN],
  },
};

export function provideCatalogUsecases() {
  return Object.values(USE_CASES);
}
