import "dotenv/config";
import { MysqlConnectionOptions } from "./mysql-connection.adapter";

export type MysqlConnectionOptionsProps = {
  dbHost?: string;
  dbName?: string;
  dbPass?: string;
  dbPort?: number;
  dbUser?: string;
};

export const dbConfig: MysqlConnectionOptions = {
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPass: process.env.DB_PASS,
  dbPort: parseInt(process.env.DB_PORT),
  dbUser: process.env.DB_USER,
};

export const getDbConfig = (options?: MysqlConnectionOptionsProps): MysqlConnectionOptions => {
  return {
    ...dbConfig,
    ...options,
  };
};
