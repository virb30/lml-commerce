import { Connection } from "../../connection/connection.interface";
import mysql from "mysql2";

export class MysqlConnectionAdapter implements Connection {
  private mysql: any;
  constructor(options: MysqlConnectionOptions) {
    const connectionString = this.buildConnectionString(options);
    this.mysql = mysql.createConnection(connectionString);
  }

  async query(statement: string, params?: any): Promise<any> {
    const [result] = await this.mysql.promise().execute(statement, params);
    return result;
  }

  async close(): Promise<void> {
    await this.mysql.promise().end();
  }

  private buildConnectionString(options: MysqlConnectionOptions) {
    const { dbUser, dbPass, dbHost, dbName, dbPort } = options;
    return `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?charset=utf8mb4`;
  }
}

export type MysqlConnectionOptions = {
  dbHost: string;
  dbPort: string;
  dbUser: string;
  dbPass: string;
  dbName: string;
};
