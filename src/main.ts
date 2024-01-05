import { ExpressHttpAdapter } from "./Infra/@shared/Http/ExpressHttpAdapter";
import { HealthCheckController } from "./Infra/@shared/Controller/HealthCheckController";
import { DatabaseRepositoryFactory } from "./Infra/@shared/Factory/DatabaseRepositoryFactory";
import { MysqlConnectionAdapter } from "./Infra/@shared/Database/MysqlConnectionAdapter";
import { getDbConnectionString } from "./config";
import { OrderController } from "./Infra/Checkout/Controller/OrderController";
import "./config";
import { MemoryQueueAdapter } from "./Infra/@shared/Queue/MemoryQueueAdapter";
import { PlaceOrderUseCase } from "./Application/Checkout/PlaceOrderUseCase";
import { Registry } from "./Infra/@shared/DI/Registry";

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
