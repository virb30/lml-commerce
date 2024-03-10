import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductInputDto {
  @ApiProperty({
    description: "Product name",
  })
  name: string;

  @ApiProperty({
    description: "Product price",
  })
  price: number;
}
