import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags("product-adm")
export class CreateProductInputDto {
  @ApiProperty({
    description: "Product name",
  })
  name: string;

  @ApiProperty({
    description: "Currency type",
  })
  currency: string;

  @ApiProperty({
    description: "Product price",
  })
  price: number;
}
