import { Connection } from "../connection/connection.interface";
import { MysqlConnectionAdapter } from "../adapter/mysql/mysql-connection.adapter";

export class DbConnectionFactory {
  static make(type: DbConnectionType, options: DbConnectionOptions): Connection | undefined {
    switch (type) {
      case "mysql":
        return new MysqlConnectionAdapter(options);
      default:
        return null;
    }
  }
}

export type DbConnectionType = "mysql" | "postgres";

export type DbConnectionOptions = {
  dbHost: string;
  dbPort: string;
  dbUser: string;
  dbPass: string;
  dbName: string;
};
