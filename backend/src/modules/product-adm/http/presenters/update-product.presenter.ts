import { UpdateProductOutput } from "@modules/product-adm/usecase/update-product.usecase";
import { UpdateProductOutputDto } from "../dtos/update-product.output.dto";

export class UpdateProductPresenter {
  static toJson(dto: UpdateProductOutput): UpdateProductOutputDto {
    return {
      id: dto.id,
      name: dto.name,
      price: dto.price,
    };
  }
}
