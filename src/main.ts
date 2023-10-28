import { ExpressHttpAdapter } from "./Infra/Http/ExpressHttpAdapter";
import { HealthCheckController } from "./Infra/Controller/HealthCheckController";
import "./config";

const port = parseInt(process.env.PORT ?? "8008");

const http = new ExpressHttpAdapter();
new HealthCheckController(http);
http.listen(port);
