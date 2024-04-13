import { HttpExceptionHandlerFactory } from "./http/http-exception/http-exception-handler.factory";

export const httpExceptionHandlerProvider = {
  HTTP_EXCEPTION_HANDLER: {
    provide: "HttpExceptionHandler",
    useFactory: () => {
      return HttpExceptionHandlerFactory.create();
    },
  },
};
