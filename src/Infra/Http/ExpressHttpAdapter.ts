import { CallbackFunction, Http, HttpMethod } from "./Http";
import express, { Request, Response, NextFunction } from "express";

export class ExpressHttpAdapter implements Http {
  public readonly app: any;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(function (_request: Request, response: Response, next: NextFunction) {
      response.header("Access-Control-Allow-Origin", "*");
      response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
      response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
      next();
    });
  }

  public on(method: HttpMethod, uri: string, callback: CallbackFunction): void {
    const routeMethod = method.toLowerCase();
    this.app[routeMethod](uri, async (request: Request, response: Response) => {
      const output = await callback(request.params, request.body);
      return response.json(output);
    });
  }

  public listen(port: number): void {
    this.app.listen(port);
  }
}
