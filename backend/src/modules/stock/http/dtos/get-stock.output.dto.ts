import { ApiProperty } from "@nestjs/swagger";

export class GetStockOutputDto {
  @ApiProperty()
  total: number;
}
