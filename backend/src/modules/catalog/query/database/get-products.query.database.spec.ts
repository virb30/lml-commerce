import { initDb } from "@test/initDb";
import { Connection } from "../../../database/connection/connection.interface";
import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { GetProductsQuery } from "../get-products.query.interface";
import { GetProductsQueryDatabase } from "./get-products.query.database";

describe("GetProductsQuery tests", () => {
  const db = initDb(MysqlConnectionAdapter);
  let databaseConnection: Connection;
  let getProductsQuery: GetProductsQuery;

  beforeAll(() => {
    databaseConnection = db.connection;
    getProductsQuery = new GetProductsQueryDatabase(databaseConnection);
  });

  beforeEach(async () => {
    await databaseConnection.query("TRUNCATE TABLE app.product", []);
    await databaseConnection.query(
      "INSERT INTO app.product (id, name, price, currency, width, height, length, weight) values (?,?,?,?,?,?,?,?)",
      ["1", "Product 1", 10.0, "brl", 1, 1, 1, 1],
    );
    await databaseConnection.query(
      "INSERT INTO app.product (id, name, price, currency, width, height, length, weight) values (?,?,?,?,?,?,?,?)",
      ["2", "Product 2", 20.0, "brl", 2, 1, 2, 2],
    );
    await databaseConnection.query(
      "INSERT INTO app.product (id, name, price, currency, width, height, length, weight) values (?,?,?,?,?,?,?,?)",
      ["3", "Product 3", 30.0, "brl", 3, 3, 1, 3],
    );
  });

  it("gets all products", async () => {
    const getProductsQuery = new GetProductsQueryDatabase(databaseConnection);
    const output = await getProductsQuery.getAll({
      page: 1,
      perPage: 10,
    });
    expect(output).toHaveLength(3);
    expect(output[0].id).toBe("1");
    expect(output[1].id).toBe("2");
    expect(output[2].id).toBe("3");
  });

  it("should get products paginated", async () => {
    const output = await getProductsQuery.getAll({
      perPage: 1,
      page: 2,
    });
    expect(output).toHaveLength(1);
    expect(output[0].id).toBe("2");
  });

  it("counts products", async () => {
    const total = await getProductsQuery.size();
    expect(total).toBe(3);
  });
});
