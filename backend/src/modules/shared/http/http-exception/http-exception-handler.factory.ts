import { BadRequestExceptionHandler } from "./handlers/bad-request-exception.handler";
import { InternalServerErrorExceptionHandler } from "./handlers/internal-server-error-exception.handler";
import { NotFoundExceptionHandler } from "./handlers/not-found-exception.handler";
import { HttpExceptionHandler } from "./http-exception-handler.interface";

export class HttpExceptionHandlerFactory {
  static create(): HttpExceptionHandler {
    const handler = new BadRequestExceptionHandler(
      new NotFoundExceptionHandler(new InternalServerErrorExceptionHandler()),
    );
    return handler;
  }
}
