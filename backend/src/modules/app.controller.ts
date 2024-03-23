import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOkResponse, ApiProperty } from "@nestjs/swagger";
import { CurrencyFactory } from "./shared/domain/value-object/currency/currency.factory";

class HealthCheckOutputDto {
  @ApiProperty()
  ok: boolean;
}

@Controller()
export class AppController {
  @Get("health-check")
  @ApiOkResponse({ description: "Returns ok if system is healthy", type: HealthCheckOutputDto })
  healtCheck(): HealthCheckOutputDto {
    const currencyFactory = CurrencyFactory.getInstance();
    console.log(currencyFactory.currencyMapper);
    return { ok: true };
  }
}
