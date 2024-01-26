export interface Http {
  app: any;
  on(method: HttpMethod, uri: string, callback: CallbackFunction): void;
  listen(port: number): void;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS" | "PATCH";

export type CallbackFunction = (params: any, body: any) => Promise<HttpResponse>;

type HttpResponse = {
  status: number;
  data: any;
};
