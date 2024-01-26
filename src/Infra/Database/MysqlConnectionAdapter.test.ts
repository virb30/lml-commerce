import { MysqlConnectionAdapter } from "./MysqlConnectionAdapter";
import { db } from "../Config";

describe("Database connection tests", () => {
  it("should connect to a database", async () => {
    const connection = new MysqlConnectionAdapter(db.getConnectionString());
    const [result] = await connection.query("SELECT 1");
    await connection.close();
    expect(result).toEqual({ 1: 1 });
  });
});
