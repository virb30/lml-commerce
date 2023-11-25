import { Http } from "../Http/Http";
import { Controller } from "./Controller";

export class HealthCheckController extends Controller {
  constructor(http: Http) {
    super();
    http.on("GET", "/health-check", async (_params, _body) => {
      return this.ok({ ok: true });
    });
  }
}
