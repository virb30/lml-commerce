import { Coupon } from "../../domain/entity/coupon";
import { Id } from "@modules/shared/domain/value-object/id";
import { MysqlConnectionAdapter } from "../../../database/connection/mysql/mysql-connection.adapter";
import { CouponRepositoryDatabase } from "./coupon.repository";
import { dbConfig } from "@modules/database/connection/mysql/config";
import { NotFoundError } from "@modules/shared/errors/not-found.error";

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
    const coupon = Coupon.create({
      code: "VALE10",
      percentage: 10,
      discountLimit: 10.0,
      expirationDate: new Date("2023-12-01T00:00:00"),
    });
    await couponRepositoryDatabase.save(coupon);
    const dbCoupon = await couponRepositoryDatabase.getByCode("VALE10");
    expect(dbCoupon).toStrictEqual(coupon);
  });

  it("throws an error coupon not found", async () => {
    expect(async () => {
      await couponRepositoryDatabase.getByCode("VALE100");
    }).rejects.toThrowErrorTypeWithMessage(NotFoundError, "Coupon not found");
  });
});
