import { Coupon } from "../../domain/entity/coupon";
import { CouponRepository } from "../../domain/repository/coupon.repository.interface";
import { Id } from "@modules/shared/domain/value-object/id";
import { Connection } from "../../../database/connection/connection.interface";
import { NotFoundError } from "@modules/shared/errors/not-found.error";

export class CouponRepositoryDatabase implements CouponRepository {
  constructor(private connection: Connection) {}

  public async getByCode(code: string): Promise<Coupon> {
    const [couponData] = await this.connection.query("SELECT * FROM app.coupon WHERE BINARY code = ?", [code]);

    if (!couponData) {
      throw new NotFoundError("Coupon not found");
    }

    return Coupon.restore({
      id: new Id(couponData.id),
      code: couponData.code,
      percentage: parseFloat(couponData.percentage),
      discountLimit: parseFloat(couponData.discount_limit),
      expirationDate: new Date(couponData.expiration_date),
    });
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
