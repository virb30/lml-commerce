import { Connection } from "../../Infra/@shared/Database/Connection";
import { MysqlConnectionAdapter } from "../../Infra/@shared/Database/MysqlConnectionAdapter";
import { getDbConnectionString } from "../../config";
import { GetProductsQuery } from "./GetProductsQuery";

describe("GetProductsQuery tests", () => {
  let databaseConnection: Connection;

  beforeAll(() => {
    databaseConnection = new MysqlConnectionAdapter(getDbConnectionString());
  });

  beforeEach(() => {
    databaseConnection.query("TRUNCATE TABLE app.product", []);
    databaseConnection.query(
      "INSERT INTO app.product (id, name, price, width, height, length, weight) values (?,?,?,?,?,?,?)",
      ["1", "Product 1", 10.0, 1, 1, 1, 1],
    );
    databaseConnection.query(
      "INSERT INTO app.product (id, name, price, width, height, length, weight) values (?,?,?,?,?,?,?)",
      ["2", "Product 2", 20.0, 2, 1, 2, 2],
    );
    databaseConnection.query(
      "INSERT INTO app.product (id, name, price, width, height, length, weight) values (?,?,?,?,?,?,?)",
      ["3", "Product 3", 30.0, 3, 3, 1, 3],
    );
  });

  afterAll(async () => {
    await databaseConnection.close();
  });

  it("should get products list", async () => {
    const input = {};
    const getProductsQuery = new GetProductsQuery(databaseConnection);
    const output = await getProductsQuery.execute(input);
    expect(output).toHaveLength(3);
    expect(output[0].id).toBe("1");
    expect(output[1].id).toBe("2");
    expect(output[2].id).toBe("3");
  });

  it("should get products paginated", async () => {
    const input = {
      perPage: 1,
      page: 2,
    };
    const getProductsQuery = new GetProductsQuery(databaseConnection);
    const output = await getProductsQuery.execute(input);
    expect(output).toHaveLength(1);
    expect(output[0].id).toBe("2");
  });
});
