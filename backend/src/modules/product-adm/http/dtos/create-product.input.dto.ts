import { ApiProperty } from "@nestjs/swagger";

export class CreateProductInputDto {
  @ApiProperty({
    description: "Product name",
  })
  name: string;

  @ApiProperty({
    description: "Product price",
  })
  price: number;
}
