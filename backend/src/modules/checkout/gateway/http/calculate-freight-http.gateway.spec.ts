import { CalculateFreightGatewayHttp } from "./calculate-freight-http.gateway";
import { HttpClientInterface } from "@modules/shared/http/http-client/http-client.interface";

class DummyHttpClient implements HttpClientInterface {
  async get(path: string, params?: any, headers?: any): Promise<any> {
    return {};
  }

  async post(path: string, body?: any, params?: any, headers?: any): Promise<any> {
    return { data: { total: 119.72 } };
  }
}

describe("calculate freight gateway http adapter tests", () => {
  let httpClient = new (class implements HttpClientInterface {
    async get(path: string, params?: any, headers?: any): Promise<any> {
      return {};
    }

    async post(path: string, body?: any, params?: any, headers?: any): Promise<any> {
      return { data: { total: 119.72 } };
    }
  })();

  it("should get freight", async () => {
    // const httpClient = new HttpClientAxiosAdapter("http://host.docker.internal:8090");
    const gateway = new CalculateFreightGatewayHttp(httpClient);
    const total = await gateway.calculate(
      [
        { volume: 1000, density: 0.001, quantity: 3 },
        { volume: 125000, density: 0.00008, quantity: 1 },
        { volume: 30000, density: 0.0001, quantity: 1 },
      ],
      {
        lat: -22.9129,
        long: -43.2003,
      },
      {
        lat: -27.5945,
        long: -48.5477,
      },
    );
    expect(total).toBe(119.72);
  });
});
