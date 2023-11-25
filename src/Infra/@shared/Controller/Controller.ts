import HttpStatus from "http-status-codes";

export abstract class Controller {
  public response(status: number = HttpStatus.OK, data: any): ControllerResponse {
    return {
      status,
      data,
    };
  }

  public ok(data: any): ControllerResponse {
    return this.response(HttpStatus.OK, data);
  }

  public created(data: any) {
    return this.response(HttpStatus.CREATED, data);
  }

  public error(data: any) {
    return this.response(HttpStatus.INTERNAL_SERVER_ERROR, data);
  }

  public badRequest(data: any) {
    return this.response(HttpStatus.BAD_REQUEST, data);
  }

  public unauthorized(data: any) {
    return this.response(HttpStatus.UNAUTHORIZED, data);
  }

  public forbidden(data: any) {
    return this.response(HttpStatus.FORBIDDEN, data);
  }

  public notFound(data: any) {
    return this.response(HttpStatus.FORBIDDEN, data);
  }
}

type ControllerResponse = {
  status: number;
  data: any;
};
