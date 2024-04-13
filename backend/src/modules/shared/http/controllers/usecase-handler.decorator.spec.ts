import { Usecase } from "@modules/shared/usecase/usecase.interface";
import { UsecaseHandler } from "./usecase-handler.decorator";
import { InputError } from "@modules/shared/errors/input.error";
import { NotFoundError } from "@modules/shared/errors/not-found.error";
import { HttpExceptionHandlerFactory } from "../http-exception/http-exception-handler.factory";
import { HttpExceptionHandler } from "../http-exception/http-exception-handler.interface";

describe("UsecaseHandler tests", () => {
  let exceptionHandler: HttpExceptionHandler;
  beforeEach(() => {
    exceptionHandler = HttpExceptionHandlerFactory.create();
  });

  it("should rethrow usecase's error", async () => {
    const usecase = new (class implements Usecase {
      execute(input?: any): Promise<any> {
        throw new InputError("Method not implemented.");
      }
    })();

    const handler = new UsecaseHandler(usecase, exceptionHandler);

    expect(async () => {
      await handler.execute();
    }).rejects.toThrowErrorTypeWithMessage(InputError, "Method not implemented.");
  });

  it("should throw a different error than usecase's with same message", async () => {
    const usecase = new (class implements Usecase {
      execute(input?: any): Promise<any> {
        throw new InputError("Method not implemented.");
      }
    })();

    const handler = new UsecaseHandler(usecase, exceptionHandler);

    expect(async () => {
      await handler.execute();
    }).rejects.toThrowErrorTypeWithMessage(NotFoundError, "Method not implemented.");
  });
});
