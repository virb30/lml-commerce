import { Coupon } from "../../domain/entity/coupon";
import { Id } from "src/modules/shared/domain/value-object/id";
import { MysqlConnectionAdapter } from "../../../database/adapter/mysql/mysql-connection.adapter";
import { CouponRepositoryDatabase } from "./coupon.repository";
import { dbConfig } from "src/modules/database/adapter/mysql/mysql-connection.adapter.spec";

describe("CouponRepository tests", () => {
  const connection = new MysqlConnectionAdapter(dbConfig);
  const couponRepositoryDatabase = new CouponRepositoryDatabase(connection);

  afterAll(async () => {
    await couponRepositoryDatabase.clear();
    await connection.close();
  });

  beforeEach(async () => {
    await couponRepositoryDatabase.clear();
  });

  it("saves a coupon", async () => {
    const coupon = new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-01T00:00:00"));
    await couponRepositoryDatabase.save(coupon);
    const dbCoupon = await couponRepositoryDatabase.getByCode("VALE10");
    expect(dbCoupon).toStrictEqual(coupon);
  });

  it("throws an error coupon not found", async () => {
    expect(async () => {
      await couponRepositoryDatabase.getByCode("VALE100");
    }).rejects.toThrow(new Error("Coupon not found"));
  });
});
