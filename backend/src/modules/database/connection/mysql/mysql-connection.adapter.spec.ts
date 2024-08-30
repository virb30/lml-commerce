import { initDb } from "../../../../../test/initDb";
import { Connection } from "../connection.interface";
import { getDbConfig } from "./config";
import { MysqlConnectionAdapter } from "./mysql-connection.adapter";

describe("Database connection tests", () => {
  const db = initDb(MysqlConnectionAdapter);

  it("should connect to a database", async () => {
    const [result] = await db.connection.query("SELECT 1");
    expect(result).toEqual({ 1: 1 });
  });
});
