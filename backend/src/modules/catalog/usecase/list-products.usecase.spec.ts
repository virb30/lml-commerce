import { ListProductsUseCase } from "./list-products.usecase";
import { Connection } from "@modules/database/connection/connection.interface";
import { MysqlConnectionAdapter } from "@modules/database/connection/mysql/mysql-connection.adapter";
import { dbConfig } from "@modules/database/connection/mysql/config";
import { GetProductsQuery } from "../query/get-products.query.interface";
import { GetProductsQueryDatabase } from "../query/database/get-products.query.database";

describe("ListProductsUseCase tests", () => {
  let databaseConnection: Connection;
  let getProductsQuery: GetProductsQuery;
  let usecase: ListProductsUseCase;

  beforeAll(() => {
    databaseConnection = new MysqlConnectionAdapter(dbConfig);
    getProductsQuery = new GetProductsQueryDatabase(databaseConnection);
    usecase = new ListProductsUseCase(getProductsQuery);
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

  afterAll(async () => {
    await databaseConnection.query("TRUNCATE TABLE app.product", []);
    await databaseConnection.close();
  });

  it("returns products list", async () => {
    const input = {};
    const output = await usecase.execute(input);
    expect(output.data).toHaveLength(3);
    expect(output.data[0].id).toBe("1");
    expect(output.data[1].id).toBe("2");
    expect(output.data[2].id).toBe("3");
    expect(output.pagination.currentPage).toBe(1);
    expect(output.pagination.total).toBe(3);
    expect(output.pagination.perPage).toBe(10);
    expect(output.pagination.totalPages).toBe(1);
  });

  it("get products list paginated", async () => {
    const input = {
      perPage: 1,
      page: 2,
    };
    const output = await usecase.execute(input);
    expect(output.data).toHaveLength(1);
    expect(output.data[0].id).toBe("2");
    expect(output.pagination.currentPage).toBe(2);
    expect(output.pagination.total).toBe(3);
    expect(output.pagination.perPage).toBe(1);
    expect(output.pagination.totalPages).toBe(3);
  });
});
