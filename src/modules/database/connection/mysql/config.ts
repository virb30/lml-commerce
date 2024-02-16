import "dotenv/config";
import { MysqlConnectionOptions } from "./mysql-connection.adapter";

export const dbConfig: MysqlConnectionOptions = {
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPass: process.env.DB_PASS,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
};
