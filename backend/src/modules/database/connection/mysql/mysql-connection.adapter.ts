import { Connection } from "../connection.interface";
import mysql from "mysql2";

export class MysqlConnectionAdapter implements Connection {
  private connection: any;
  constructor(options: MysqlConnectionOptions) {
    const connectionString = this.buildConnectionString(options);
    this.connection = mysql
      .createPool({
        database: options.dbName,
        host: options.dbHost,
        password: options.dbPass,
        user: options.dbUser,
        port: options.dbPort,
        charset: "utf8mb4",
      })
      .promise();
  }

  async query(statement: string, params?: any): Promise<any> {
    const [result] = await this.connection.execute(statement, params);
    return result;
  }

  async close(): Promise<void> {
    await this.connection.end();
  }

  private buildConnectionString(options: MysqlConnectionOptions) {
    const { dbUser, dbPass, dbHost, dbName, dbPort } = options;
    return `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?charset=utf8mb4`;
  }
}

export type MysqlConnectionOptions = {
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbPass: string;
  dbName: string;
};
