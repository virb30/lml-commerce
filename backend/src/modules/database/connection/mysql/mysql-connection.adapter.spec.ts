import { dbConfig } from "./config";
import { MysqlConnectionAdapter, MysqlConnectionOptions } from "./mysql-connection.adapter";

describe("Database connection tests", () => {
  it("should connect to a database", async () => {
    const connection = new MysqlConnectionAdapter(dbConfig);
    const [result] = await connection.query("SELECT 1");
    await connection.close();
    expect(result).toEqual({ 1: 1 });
  });
});
