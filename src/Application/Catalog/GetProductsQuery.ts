import { Connection } from "../../Infra/@shared/Database/Connection";

export class GetProductsQuery {
  constructor(private connection: Connection) {}

  async execute(input: Input): Promise<Output[]> {
    let limit = 10;
    if (input.perPage && input.perPage <= 100) {
      limit = input.perPage;
    }

    let offset = 0;
    if (input.page) {
      offset = input.page - 1 * limit;
    }

    const productsData = await this.connection.query(
      "SELECT id, name, price, width, height, length, weight FROM app.product LIMIT ?,?;",
      [offset.toString(), limit.toString()],
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

type Input = {
  perPage?: number;
  page?: number;
};

type Output = {
  id: string;
  name: string;
  price: number;
  width?: number;
  height?: number;
  length?: number;
  weight?: number;
};
