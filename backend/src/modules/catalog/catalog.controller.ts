import { Controller, Get, Query } from "@nestjs/common";
import { ListProductsOutput, ListProductsUseCase } from "./usecase/list-products.usecase";

@Controller("products")
export class CatalogController {
  constructor(private readonly listProductsUseCase: ListProductsUseCase) {}

  @Get()
  async findAll(@Query("page") page?: number, @Query("perPage") perPage?: number): Promise<ListProductsOutput> {
    return this.listProductsUseCase.execute({ page, perPage });
  }
}
