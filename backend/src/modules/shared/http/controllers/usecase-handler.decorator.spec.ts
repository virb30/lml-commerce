import { Usecase } from "@modules/shared/usecase/usecase.interface";
import { UsecaseHandler } from "./usecase-handler.decorator";
import { InputError } from "@modules/shared/errors/input.error";
import { NotFoundError } from "@modules/shared/errors/not-found.error";
import { HttpExceptionHandlerFactory } from "../http-exception/http-exception-handler.factory";
import { HttpExceptionHandler } from "../http-exception/http-exception-handler.interface";
import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";

describe("UsecaseHandler tests", () => {
  let exceptionHandler: HttpExceptionHandler;
  beforeEach(() => {
    exceptionHandler = HttpExceptionHandlerFactory.create();
  });

  it("should throw BadRequestException for InputError", async () => {
    const usecase = new (class implements Usecase {
      execute(input?: any): Promise<any> {
        throw new InputError("Method not implemented.");
      }
    })();

    const handler = new UsecaseHandler(usecase, exceptionHandler);

    expect(async () => {
      await handler.execute();
    }).rejects.toThrowErrorTypeWithMessage(BadRequestException, "Method not implemented.");
  });

  it("should throw NotFoundException for NotFoundError", async () => {
    const usecase = new (class implements Usecase {
      execute(input?: any): Promise<any> {
        throw new NotFoundError("Method not implemented.");
      }
    })();

    const handler = new UsecaseHandler(usecase, exceptionHandler);

    expect(async () => {
      await handler.execute();
    }).rejects.toThrowErrorTypeWithMessage(NotFoundException, "Method not implemented.");
  });

  it("should throw InternalServerErrorException for any Error", async () => {
    const usecase = new (class implements Usecase {
      execute(input?: any): Promise<any> {
        throw new Error("Method not implemented.");
      }
    })();

    const handler = new UsecaseHandler(usecase, exceptionHandler);

    expect(async () => {
      await handler.execute();
    }).rejects.toThrowErrorTypeWithMessage(InternalServerErrorException, "Method not implemented.");
  });
});
