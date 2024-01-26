import "./config";

import { ExpressHttpAdapter } from "./Infra/Http/ExpressHttpAdapter";
import { HealthCheckController } from "./Modules/@shared/Controller/HealthCheckController";
import { DatabaseRepositoryFactory } from "./Modules/@shared/Factory/DatabaseRepositoryFactory";
import { MysqlConnectionAdapter } from "./Infra/Database/MysqlConnectionAdapter";
import { getDbConnectionString } from "./config";
import { OrderController } from "./Modules/Checkout/Controller/OrderController";
import { MemoryQueueAdapter } from "./Infra/Queue/MemoryQueueAdapter";
import { PlaceOrderUseCase } from "./Modules/Checkout/UseCase/PlaceOrderUseCase";
import { Registry } from "./Infra/DI/Registry";

const port = parseInt(process.env.PORT ?? "8008");

const http = new ExpressHttpAdapter();
const connection = new MysqlConnectionAdapter(getDbConnectionString());
const queue = new MemoryQueueAdapter();

const repositoryFactory = new DatabaseRepositoryFactory(connection);

// usecases
const placeOrder = new PlaceOrderUseCase(repositoryFactory, queue);

// di
const registry = Registry.getInstance();
registry.register("httpServer", http);
registry.register("queue", queue);
registry.register("placeOrder", placeOrder);

// controllers
new HealthCheckController();
new OrderController();

http.listen(port);
