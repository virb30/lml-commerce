import { Connection } from "@modules/database/connection/connection.interface";
import { getDbConfig } from "@modules/database/connection/mysql/config";
import { startDbContainer } from "./setupContainers";

export function initDb(connectionClass: new (...args: any[]) => Connection) {
  let _connection: Connection;

  beforeAll(async () => {
    const dbContainer = await startDbContainer();
    const config = getDbConfig({
      dbName: dbContainer.getDatabase(),
      dbPass: dbContainer.getRootPassword(),
      dbHost: dbContainer.getHost(),
      dbPort: dbContainer.getMappedPort(3306),
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
