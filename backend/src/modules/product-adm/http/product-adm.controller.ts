import { Body, Controller, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CreateProductOutput, CreateProductUseCase } from "../usecase/create-product.usecase";
import { UpdateProductOutput, UpdateProductUseCase } from "../usecase/update-product.usecase";
import { ApiBody, ApiCreatedResponse, ApiOAuth2, ApiOkResponse, ApiParam, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { CreateProductInputDto } from "./dtos/create-product.input.dto";
import { CreateProductOutputDto } from "./dtos/create-product.output.dto";
import { CreateProductPresenter } from "./presenters/create-product.presenter";
import { UpdateProductInputDto } from "./dtos/update-product.input.dto";
import { UpdateProductPresenter } from "./presenters/update-product.presenter";
import { UpdateProductOutputDto } from "./dtos/update-product.output.dto";
import { AuthGuard } from "@modules/auth/auth.guard";
import { UsecaseHandler } from "@modules/shared/http/controllers/usecase-handler.decorator";
import { HttpExceptionHandler } from "@modules/shared/http/http-exception/http-exception-handler.interface";

@ApiOAuth2([])
@ApiTags("product-adm")
@UseGuards(AuthGuard)
@Controller("admin/products")
export class ProductAdmController {
  constructor(
    private readonly createProduct: CreateProductUseCase,
    private readonly updateProduct: UpdateProductUseCase,
    @Inject("HttpExceptionHandler")
    private readonly exceptionHandler: HttpExceptionHandler,
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
    const handler = new UsecaseHandler(this.createProduct, this.exceptionHandler);
    const output = await handler.execute(input);
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
    const handler = new UsecaseHandler(this.updateProduct, this.exceptionHandler);
    const output = await handler.execute(input);
    return UpdateProductPresenter.toJson(output);
  }
}
