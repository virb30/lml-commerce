import { Coupon } from "../../Domain/Entity/Coupon";
import { CouponRepository } from "../../Domain/Repository/CouponRepository";
import { Id } from "../../Domain/ValueObjects/Id";
import { Connection } from "../Database/Connection";

export class CouponRepositoryDatabase implements CouponRepository {
  constructor(private connection: Connection) {}

  public async getByCode(code: string): Promise<Coupon> {
    const [couponData] = await this.connection.query("SELECT * FROM app.coupon WHERE BINARY code = ?", [code]);

    if (!couponData) {
      throw new Error("Coupon not found");
    }

    return new Coupon(
      new Id(couponData.id),
      couponData.code,
      parseFloat(couponData.percentage),
      parseFloat(couponData.discount_limit),
      new Date(couponData.expiration_date),
    );
  }
  public async save(coupon: Coupon): Promise<void> {
    await this.connection.query(
      "INSERT INTO app.coupon (id, code, percentage, discount_limit, expiration_date) VALUES (?, ?, ?, ?, ?)",
      [coupon.id.value, coupon.code, coupon.percentage, coupon.discountLimit, coupon.expirationDate],
    );
  }
  public async clear(): Promise<void> {
    await this.connection.query("DELETE FROM app.coupon", []);
  }
}
