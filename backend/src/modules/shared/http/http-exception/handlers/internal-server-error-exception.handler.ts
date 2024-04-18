import { HttpExceptionHandler } from "../http-exception-handler.interface";
import { InternalServerErrorException } from "@nestjs/common";

export class InternalServerErrorExceptionHandler implements HttpExceptionHandler {
  constructor(private next?: HttpExceptionHandler) {}

  handle(error: any): void {
    if (error instanceof Error) {
      throw new InternalServerErrorException(error.message);
    }

    if (this.next) {
      this.next.handle(error);
    }
  }
}
