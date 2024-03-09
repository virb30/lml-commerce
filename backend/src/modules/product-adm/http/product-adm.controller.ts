import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { CreateProductOutput, CreateProductUseCase } from "../usecase/create-product.usecase";
import { UpdateProductOutput, UpdateProductUseCase } from "../usecase/update-product.usecase";

@Controller("admin/products")
export class ProductAdmController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
  ) {}

  @Post()
  async create(@Body("name") name: string, @Body("price") price: number): Promise<CreateProductOutput> {
    const input = {
      name,
      price,
    };
    return this.createProduct.execute(input);
  }

  @Put(":productId")
  async update(
    @Param("productId") productId: string,
    @Body("name") name: string,
    @Body("price") price: number,
  ): Promise<UpdateProductOutput> {
    const input = {
      id: productId,
      name,
      price,
    };
    return this.updateProduct.execute(input);
  }
}
