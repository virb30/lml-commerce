import { NotFoundError } from "@modules/shared/errors/not-found.error";
import { HttpExceptionHandler } from "../http-exception-handler.interface";
import { NotFoundException } from "@nestjs/common";

export class NotFoundExceptionHandler implements HttpExceptionHandler {
  constructor(private next?: HttpExceptionHandler) {}

  handle(error: any): void {
    if (error instanceof NotFoundError) {
      throw new NotFoundException(error.message);
    }

    if (this.next) {
      this.next.handle(error);
    }
  }
}
