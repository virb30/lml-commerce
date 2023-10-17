import { Connection } from "./Connection";
import mysql from "mysql2";

export class MysqlConnectionAdapter implements Connection {
    private mysql: any;
    constructor(connectionString: string) {
        console.log('con', connectionString);
        this.mysql = mysql
            .createConnection(connectionString);
    }
    async query(statement: string, params?: any): Promise<any> {
        const [result] = await this.mysql.promise().execute(statement, params);
        return result;
    }
    async close(): Promise<void> {
        await this.mysql.promise().end();
    }
}
