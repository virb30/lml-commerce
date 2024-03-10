import { ApiProperty } from "@nestjs/swagger";

export class PaginationDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  perPage: number;
}

export class PaginatedDto<T> {
  @ApiProperty()
  pagination: PaginationDto;

  @ApiProperty()
  data: T[];
}
