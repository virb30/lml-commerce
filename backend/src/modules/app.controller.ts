import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";

class HealthCheckOutputDto {
  @ApiProperty()
  ok: boolean;
}

@Controller()
export class AppController {
  @Get("health-check")
  @ApiOkResponse({ description: "Returns ok if system is healthy", type: HealthCheckOutputDto })
  healtCheck(): HealthCheckOutputDto {
    throw new Error();
    return { ok: true };
  }
}
