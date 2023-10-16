import { MysqlConnectionAdapter } from "../src/Infra/Database/MysqlConnectionAdapter";

describe("Database connection test", () => {
  it("should connection in databse", async () => {
    const connection = new MysqlConnectionAdapter();
    const [result] = await connection.query("SELECT 1");
    await connection.close();
    expect(result).toEqual({ "1": 1 });
  });
});
