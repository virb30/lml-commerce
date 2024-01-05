import { inject } from "../DI/Registry";
import { Http } from "../Http/Http";
import { Controller } from "./Controller";

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
