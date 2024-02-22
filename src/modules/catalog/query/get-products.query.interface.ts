export interface GetProductsQuery {
  getAll(criteria: GetProductsQueryInput): Promise<ProductOutput[]>;
  size(): Promise<number>;
}

export type GetProductsQueryInput = {
  page?: number;
  perPage?: number;
};

export type ProductOutput = {
  id: string;
  name: string;
  price: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
};
