import { ApiProperty } from "@nestjs/swagger";

export class CreateProductOutputDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  createdAt: Date;
}
