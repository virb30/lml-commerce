import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health-check")
  healtCheck(): { ok: boolean } {
    return { ok: true };
  }
}
