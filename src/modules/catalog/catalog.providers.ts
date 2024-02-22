import { GetProductsQueryDatabase } from "./query/database/get-products.query.database";
import { Connection } from "../database/connection/connection.interface";
import { CONNECTION_PROVIDER_TOKEN } from "../database/database.providers";

export const USE_CASES = {
  GET_PRODUCTS_QUERY: {
    provide: GetProductsQueryDatabase,
    useFactory: (connection: Connection) => {
      return new GetProductsQueryDatabase(connection);
    },
    inject: [CONNECTION_PROVIDER_TOKEN],
  },
};

export function provideCatalogUsecases() {
  return Object.values(USE_CASES);
}
