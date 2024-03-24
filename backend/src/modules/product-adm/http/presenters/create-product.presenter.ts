import { CreateProductOutput } from "@modules/product-adm/usecase/create-product.usecase";
import { CreateProductOutputDto } from "../dtos/create-product.output.dto";

export class CreateProductPresenter {
  static toJson(dto: CreateProductOutput): CreateProductOutputDto {
    return {
      id: dto.id,
      name: dto.name,
      price: dto.price,
      currency: dto.currency,
      createdAt: dto.createdAt,
    };
  }
}
