import { PaginatedDto } from "@modules/shared/dto/paginated.dto";
import { ListProductsOutput } from "../../usecase/list-products.usecase";
import { ProductDto } from "../dtos/list-products.output.dto";

export class ProductListPresenter {
  static toJson(dto: ListProductsOutput): PaginatedDto<ProductDto> {
    return {
      pagination: {
        currentPage: dto.pagination.currentPage,
        total: dto.pagination.total,
        totalPages: dto.pagination.totalPages,
        perPage: dto.pagination.perPage,
      },
      data: dto.data,
    };
  }
}
