import { Body, Controller, Post } from "@nestjs/common";
import { CreateProductOutput, CreateProductUseCase } from "./usecase/create-product.usecase";

@Controller("admin/products")
export class ProductAdmController {
  constructor(private readonly createProduct: CreateProductUseCase) {}

  @Post()
  async create(@Body("name") name: string, @Body("price") price: number): Promise<CreateProductOutput> {
    const input = {
      name,
      price,
    };
    return this.createProduct.execute(input);
  }
}
