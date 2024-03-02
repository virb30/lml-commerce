import { Usecase } from "@modules/shared/usecase/usecase.interface";
import { GetProductsQuery } from "../query/get-products.query.interface";
import { first } from "rxjs";

export class ListProductsUseCase implements Usecase {
  DEFAULT_ITEMS_PER_PAGE = 10;
  constructor(private readonly getProductsQuery: GetProductsQuery) {}

  async execute(input: ListProductsInput): Promise<ListProductsOutput> {
    const page = input.page ?? 1;
    const perPage = input.perPage ?? this.DEFAULT_ITEMS_PER_PAGE;

    const criteria = {
      perPage,
      page,
    };
    const products = await this.getProductsQuery.getAll(criteria);
    const total = await this.getProductsQuery.size();
    const totalPages = Math.ceil(total / perPage);

    return {
      pagination: {
        total,
        currentPage: page,
        totalPages,
        perPage,
      },
      data: products,
    };
  }
}

type ListProductsInput = {
  perPage?: number;
  page?: number;
};

export type ListProductsOutput = {
  pagination: Pagination;
  data: Product[];
};

type Pagination = {
  total: number;
  currentPage: number;
  totalPages: number;
  perPage: number;
};

type Product = {
  id: string;
  name: string;
  price: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
};
