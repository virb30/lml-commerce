import axios, { AxiosInstance } from "axios";
import { HttpClientInterface } from "./http-client.interface";

export class HttpClientAxiosAdapter implements HttpClientInterface {
  httpClient: AxiosInstance;

  constructor(baseURL: string) {
    this.httpClient = axios.create({
      baseURL,
    });
  }

  async get(path: string, params?: any, headers?: any): Promise<any> {
    return this.httpClient.get(path, {
      params,
      headers,
    });
  }

  async post(path: string, body?: any, params?: any, headers?: any): Promise<any> {
    return this.httpClient.post(path, body, {
      params,
      headers,
    });
  }
}
