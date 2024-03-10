import { ApiProperty } from "@nestjs/swagger";

export class PlaceOrderOutputDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  total: number;

  @ApiProperty()
  freight: number;
}
