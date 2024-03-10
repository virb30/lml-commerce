import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  width?: number;

  @ApiProperty()
  height?: number;

  @ApiProperty()
  length?: number;

  @ApiProperty()
  weight?: number;
}
