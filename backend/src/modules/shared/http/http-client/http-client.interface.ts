export interface HttpClientInterface {
  get(path: string, params?: any, headers?: any): Promise<any>;
  post(path: string, body?: any, params?: any, headers?: any): Promise<any>;
}
