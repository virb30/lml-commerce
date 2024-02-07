import "dotenv/config";
import { MysqlConnectionAdapter, MysqlConnectionOptions } from "./mysql-connection.adapter";

export const dbConfig: MysqlConnectionOptions = {
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPass: process.env.DB_PASS,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
};

describe("Database connection tests", () => {
  it("should connect to a database", async () => {
    const connection = new MysqlConnectionAdapter(dbConfig);
    const [result] = await connection.query("SELECT 1");
    await connection.close();
    expect(result).toEqual({ 1: 1 });
  });
});
