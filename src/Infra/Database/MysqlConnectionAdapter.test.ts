import { MysqlConnectionAdapter } from "./MysqlConnectionAdapter";
import { getDbConnectionString } from "../../config";

describe("Database connection tests", () => {
  it("should connect to a database", async () => {
    const connection = new MysqlConnectionAdapter(getDbConnectionString());
    const [result] = await connection.query("SELECT 1");
    await connection.close();
    expect(result).toEqual({ 1: 1 });
  });
});
