import { Connection } from "@modules/database/connection/connection.interface";
import { getDbConfig } from "@modules/database/connection/mysql/config";
import { getContainerRuntimeClient } from "testcontainers";

export function initDb(connectionClass: new (...args: any[]) => Connection) {
  let _connection: Connection;

  beforeAll(async () => {
    const containerRuntimeClient = await getContainerRuntimeClient();
    const config = getDbConfig({
      dbUser: "root",
      dbPass: "123456",
      dbName: "app",
      dbHost: containerRuntimeClient.info.containerRuntime.host,
      dbPort: 3306,
    });
    _connection = new connectionClass(config);
  }, 30000);

  afterAll(async () => {
    await _connection.close();
  });

  return {
    get connection() {
      return _connection;
    },
  };
}
