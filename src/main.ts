import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";

const port = parseInt(process.env.PORT ?? "8008");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap();
// import { DatabaseRepositoryFactory } from "./Modules/@shared/Factory/DatabaseRepositoryFactory";
// import { MysqlConnectionAdapter } from "./Infra/Database/MysqlConnectionAdapter";
// import { db } from "./Infra/Config";
// import { MemoryQueueAdapter } from "./Infra/Queue/MemoryQueueAdapter";
// import { OrderController } from "./Modules/Checkout/Controller/OrderController";
// import { PlaceOrderUseCase } from "./Modules/Checkout/UseCase/PlaceOrderUseCase";

// const http = new ExpressHttpAdapter();
// const connection = new MysqlConnectionAdapter(db.getConnectionString());
// const queue = new MemoryQueueAdapter();

// const repositoryFactory = new DatabaseRepositoryFactory(connection);

// // controllers
// new HealthCheckController();
// new OrderController();

// http.listen(port);
