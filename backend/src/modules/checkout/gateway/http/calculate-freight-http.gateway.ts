import { HttpClientInterface } from "@modules/shared/http/http-client/http-client.interface";
import { CalculateFreightGateway } from "../calculate-freight.gateway.interface";

export class CalculateFreightGatewayHttp implements CalculateFreightGateway {
  constructor(private httpClient: HttpClientInterface) {}

  async calculate(
    orderItems: { volume: number; density: number; quantity: number }[],
    from?: { lat: number; long: number },
    to?: { lat: number; long: number },
  ): Promise<number> {
    try {
      const body = {
        items: orderItems,
        from,
        to,
      };
      const { data } = await this.httpClient.post("/freight", body, {});
      return data.total;
    } catch (err) {
      throw new Error();
    }
  }
}
