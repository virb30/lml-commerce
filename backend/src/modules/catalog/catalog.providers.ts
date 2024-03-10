import { GetProductsQueryDatabase } from "./query/database/get-products.query.database";
import { Connection } from "../database/connection/connection.interface";
import { ListProductsUseCase } from "./usecase/list-products.usecase";
import { GetProductsQuery } from "./query/get-products.query.interface";
import { CONNECTION_PROVIDER_TOKEN } from "../database/database.providers";

export const QUERIES = {
  GET_PRODUCTS: {
    provide: GetProductsQueryDatabase,
    useFactory: (connection: Connection) => {
      return new GetProductsQueryDatabase(connection);
    },
    inject: [CONNECTION_PROVIDER_TOKEN],
  },
};

export const USE_CASES = {
  LIST_PRODUCTS: {
    provide: ListProductsUseCase,
    useFactory: (getProductsQuery: GetProductsQuery) => {
      return new ListProductsUseCase(getProductsQuery);
    },
    inject: [QUERIES.GET_PRODUCTS.provide],
  },
};

export function provideCatalogUsecases() {
  return Object.values(USE_CASES);
}

export function provideCatalogQueries() {
  return Object.values(QUERIES);
}
