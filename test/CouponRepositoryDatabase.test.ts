import Coupon from "../src/Domain/Entity/Coupon";
import { Id } from "../src/Domain/ValueObjects/Id";
import { MysqlConnectionAdapter } from "../src/Infra/Database/MysqlConnectionAdapter";
import CouponRepositoryDatabase from "../src/Infra/Repository/CouponRepositoryDatabase";
import { getDbConnectionString } from "../src/config";

describe("CouponRepository tests", () => {
  const connection = new MysqlConnectionAdapter(getDbConnectionString());
  const couponRepositoryDatabase = new CouponRepositoryDatabase(connection);

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await couponRepositoryDatabase.clear();
  });

  it("Should save an coupon in CouponRepository", async () => {
    const coupon = new Coupon(new Id("1"), "VALE10", 10, 10.0, new Date("2023-12-01T00:00:00"));
    await couponRepositoryDatabase.save(coupon);
    const dbCoupon = await couponRepositoryDatabase.getByCode("VALE10");
    expect(dbCoupon).toStrictEqual(coupon);
  });

  it("Should throw error coupon not found", async () => {
    expect(async () => {
      await couponRepositoryDatabase.getByCode("VALE100");
    }).rejects.toThrow(new Error("Coupon not found"));
  });
});
