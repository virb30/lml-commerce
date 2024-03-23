import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { CreateProductOutput, CreateProductUseCase } from "../usecase/create-product.usecase";
import { UpdateProductOutput, UpdateProductUseCase } from "../usecase/update-product.usecase";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { CreateProductInputDto } from "./dtos/create-product.input.dto";
import { CreateProductOutputDto } from "./dtos/create-product.output.dto";
import { CreateProductPresenter } from "./presenters/create-product.presenter";
import { UpdateProductInputDto } from "./dtos/update-product.input.dto";
import { UpdateProductPresenter } from "./presenters/update-product.presenter";
import { UpdateProductOutputDto } from "./dtos/update-product.output.dto";

@Controller("admin/products")
export class ProductAdmController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
  ) {}

  @Post()
  @ApiBody({
    type: CreateProductInputDto,
  })
  @ApiCreatedResponse({
    type: CreateProductOutputDto,
  })
  async create(
    @Body("name") name: string,
    @Body("price") price: number,
    @Body("currency") currency: string,
  ): Promise<CreateProductOutput> {
    const input = {
      name,
      price,
      currency,
    };
    const output = await this.createProduct.execute(input);
    return CreateProductPresenter.toJson(output);
  }

  @Put(":productId")
  @ApiParam({ name: "productId", description: "Id of the product to be updated", required: true })
  @ApiBody({ type: UpdateProductInputDto })
  @ApiOkResponse({
    type: UpdateProductOutputDto,
  })
  async update(
    @Param("productId") productId: string,
    @Body("name") name: string,
    @Body("price") price: number,
    @Body("currency") currency: string,
  ): Promise<UpdateProductOutput> {
    const input = {
      id: productId,
      name,
      price,
      currency,
    };
    const output = await this.updateProduct.execute(input);
    return UpdateProductPresenter.toJson(output);
  }
}
