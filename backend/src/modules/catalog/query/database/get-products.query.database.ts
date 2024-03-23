import { Connection } from "@modules/database/connection/connection.interface";
import { GetProductsQuery, GetProductsQueryInput, ProductOutput } from "../get-products.query.interface";
import { PaginatableQueryDatabase } from "@modules/shared/query/database/paginatable.query.database";

export class GetProductsQueryDatabase extends PaginatableQueryDatabase implements GetProductsQuery {
  public PER_PAGE_LIMIT: number = 10;

  constructor(private connection: Connection) {
    super();
  }

  async size(): Promise<number> {
    const [totalProducts] = await this.connection.query("SELECT COUNT(*) total FROM app.product;", []);
    return parseInt(totalProducts.total);
  }

  async getAll(criteria: GetProductsQueryInput): Promise<ProductOutput[]> {
    const { offset, limit } = this.getPagination(criteria.page, criteria.perPage);

    const productsData = await this.connection.query(
      "SELECT id, name, price, currency, width, height, length, weight FROM app.product LIMIT ? OFFSET ?;",
      [limit.toString(), offset.toString()],
    );

    return productsData.map((productData: any) => ({
      id: productData.id,
      name: productData.name,
      price: parseFloat(productData.price),
      currency: productData.currency,
      width: parseInt(productData.width),
      height: parseInt(productData.height),
      length: parseInt(productData.length),
      weight: parseInt(productData.weight),
    }));
  }
}
