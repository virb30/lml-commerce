import { Connection } from "./Connection";
import mysql from "mysql2";

export class MysqlConnectionAdapter implements Connection {
  private mysql: any;
  constructor() {
    this.mysql = mysql
      .createConnection("mysql://root:123456@localhost:3306/app");
  }
  async query(statement: string, params?: any): Promise<any> {
    const [result] = await this.mysql.promise().execute(statement, params);
    return result;
  }
  async close(): Promise<void> {
    await this.mysql.promise().end();
  }
}
