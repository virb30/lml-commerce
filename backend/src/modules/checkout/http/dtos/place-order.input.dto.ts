import { ApiProperty } from "@nestjs/swagger";

export class OrderItemInputDto {
  @ApiProperty()
  productId: string;

  @ApiProperty()
  amount: number;
}

export class PlaceOrderInputDto {
  @ApiProperty()
  email: string;

  @ApiProperty({
    isArray: true,
    type: OrderItemInputDto,
  })
  items: OrderItemInputDto[];
}
