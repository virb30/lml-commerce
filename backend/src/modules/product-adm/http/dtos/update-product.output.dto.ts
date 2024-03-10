import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductOutputDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}
