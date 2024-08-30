import { PullPolicy, Wait } from "testcontainers";
import { MySqlContainer } from "@testcontainers/mysql";

import { migrate } from "../migrations/migrations";
import { getDbConfig } from "../src/modules/database/connection/mysql/config";
import { MysqlConnectionAdapter } from "../src/modules/database/connection/mysql/mysql-connection.adapter";

export default async function setupContainers() {
  const dbContainer = await new MySqlContainer()
    .withPullPolicy(PullPolicy.defaultPolicy())
    .withName("db-container")
    .withDatabase("app")
    .withReuse()
    .withRootPassword("123456")
    .withExposedPorts({
      container: 3306,
      host: 3306,
    })
    .withEnvironment({
      MYSQL_ROOT_PASSWORD: "123456",
      MYSQL_DATABASE: "app",
    })
    .withWaitStrategy(Wait.forListeningPorts())
    .start();

  const config = getDbConfig({
    dbUser: "root",
    dbPass: "123456",
    dbName: "app",
    dbHost: dbContainer.getHost(),
    dbPort: 3306,
  });
  const connection = new MysqlConnectionAdapter(config);
  await migrate(connection);
  connection.close();

  global.dbContainer = dbContainer;
}
