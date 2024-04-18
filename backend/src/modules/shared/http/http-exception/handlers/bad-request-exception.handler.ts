import { InputError } from "@modules/shared/errors/input.error";
import { HttpExceptionHandler } from "../http-exception-handler.interface";
import { BadRequestException } from "@nestjs/common";

export class BadRequestExceptionHandler implements HttpExceptionHandler {
  constructor(private next?: HttpExceptionHandler) {}

  handle(error: any): void {
    if (error instanceof InputError) {
      throw new BadRequestException(error.message);
    }

    if (this.next) {
      this.next.handle(error);
    }
  }
}
