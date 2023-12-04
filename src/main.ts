import { ExpressHttpAdapter } from "./Infra/@shared/Http/ExpressHttpAdapter";
import { HealthCheckController } from "./Infra/@shared/Controller/HealthCheckController";
import { DatabaseRepositoryFactory } from "./Infra/@shared/Factory/DatabaseRepositoryFactory";
import { MysqlConnectionAdapter } from "./Infra/@shared/Database/MysqlConnectionAdapter";
import { getDbConnectionString } from "./config";
import { OrderController } from "./Infra/Checkout/Controller/OrderController";
import "./config";
import { MemoryQueueAdapter } from "./Infra/@shared/Queue/MemoryQueueAdapter";

const port = parseInt(process.env.PORT ?? "8008");

const http = new ExpressHttpAdapter();
const connection = new MysqlConnectionAdapter(getDbConnectionString());
const repositoryFactory = new DatabaseRepositoryFactory(connection);
new HealthCheckController(http);
const queue = new MemoryQueueAdapter();
new OrderController(http, repositoryFactory, queue);
http.listen(port);
