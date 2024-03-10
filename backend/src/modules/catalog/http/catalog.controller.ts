import { Controller, Get, Query } from "@nestjs/common";
import { ListProductsOutput, ListProductsUseCase } from "../usecase/list-products.usecase";
import { ApiExtraModels, ApiOkResponse, ApiQuery, getSchemaPath } from "@nestjs/swagger";
import { ProductDto } from "./dtos/list-products.output.dto";
import { ProductListPresenter } from "./presenters/product-list.presenter";
import { PaginatedDto } from "@modules/shared/dto/paginated.dto";

@Controller("products")
export class CatalogController {
  constructor(private readonly listProductsUseCase: ListProductsUseCase) {}

  @Get()
  @ApiQuery({
    name: "page",
    type: "number",
    required: false,
    description: "desired page to show results (defaults to 1)",
    allowEmptyValue: true,
    schema: { minimum: 1 },
  })
  @ApiQuery({
    name: "perPage",
    type: "number",
    required: false,
    description: "amount of items to show per page (defaults to 10)",
    schema: { minimum: 1, maximum: 10 },
  })
  @ApiExtraModels(PaginatedDto, ProductDto)
  @ApiOkResponse({
    schema: {
      allOf: [
        { $ref: getSchemaPath(PaginatedDto<ProductDto>) },
        {
          properties: {
            data: {
              type: "array",
              items: { $ref: getSchemaPath(ProductDto) },
            },
          },
        },
      ],
    },
  })
  async findAll(@Query("page") page?: number, @Query("perPage") perPage?: number): Promise<PaginatedDto<ProductDto>> {
    const output = await this.listProductsUseCase.execute({ page, perPage });
    return ProductListPresenter.toJson(output);
  }
}
