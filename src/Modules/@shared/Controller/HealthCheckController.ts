import { inject } from "../../../Infra/DI/Registry";
import { Http } from "../../../Infra/Http/Http";
import { Controller } from "../../../Infra/Controller/Controller";

export class HealthCheckController extends Controller {
  @inject("httpServer")
  http?: Http;

  constructor() {
    super();
    this.http?.on("GET", "/health-check", async (_params, _body) => {
      return this.ok({ ok: true });
    });
  }
}
