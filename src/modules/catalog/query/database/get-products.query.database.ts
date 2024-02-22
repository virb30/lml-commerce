import { Connection } from "../../../database/connection/connection.interface";
import { GetProductsQuery, GetProductsQueryInput, ProductOutput } from "../get-products.query.interface";

export class GetProductsQueryDatabase implements GetProductsQuery {
  constructor(private connection: Connection) {}

  async size(): Promise<number> {
    const [totalProducts] = await this.connection.query("SELECT COUNT(*) total FROM app.product;", []);
    return parseInt(totalProducts.total);
  }

  async getAll(criteria: GetProductsQueryInput): Promise<ProductOutput[]> {
    const limit = criteria.perPage;

    let offset = 0;
    if (criteria.page) {
      offset = (criteria.page - 1) * limit;
    }

    const productsData = await this.connection.query(
      "SELECT id, name, price, width, height, length, weight FROM app.product LIMIT ? OFFSET ?;",
      [limit.toString(), offset.toString()],
    );

    return productsData.map((productData: any) => ({
      id: productData.id,
      name: productData.name,
      price: parseFloat(productData.price),
      width: parseInt(productData.width),
      height: parseInt(productData.height),
      length: parseInt(productData.length),
      weight: parseInt(productData.weight),
    }));
  }
}
