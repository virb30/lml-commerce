import { ExpressHttpAdapter } from "./Infra/Http/ExpressHttpAdapter";
import { HealthCheckController } from "./Infra/Controller/HealthCheckController";
import { DatabaseRepositoryFactory } from "./Infra/Factory/DatabaseRepositoryFactory";
import { MysqlConnectionAdapter } from "./Infra/Database/MysqlConnectionAdapter";
import { getDbConnectionString } from "./config";
import { OrderController } from "./Infra/Controller/OrderController";
import "./config";

const port = parseInt(process.env.PORT ?? "8008");

const http = new ExpressHttpAdapter();
const connection = new MysqlConnectionAdapter(getDbConnectionString());
const repositoryFactory = new DatabaseRepositoryFactory(connection);
new HealthCheckController(http);
new OrderController(http, repositoryFactory);
http.listen(port);
