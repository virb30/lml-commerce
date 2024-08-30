import { Coupon } from "../../domain/entity/coupon";
import { Id } from "@modules/shared/domain/value-object/id";
import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { CouponRepositoryDatabase } from "./coupon.repository";
import { NotFoundError } from "@modules/shared/errors/not-found.error";
import { initDb } from "@test/initDb";

describe("CouponRepository tests", () => {
  const db = initDb(MysqlConnectionAdapter);
  let couponRepositoryDatabase: CouponRepositoryDatabase;

  beforeAll(() => {
    couponRepositoryDatabase = new CouponRepositoryDatabase(db.connection);
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
    await expect(couponRepositoryDatabase.getByCode("VALE100")).rejects.toThrowErrorTypeWithMessage(
      NotFoundError,
      "Coupon not found",
    );
  });
});
