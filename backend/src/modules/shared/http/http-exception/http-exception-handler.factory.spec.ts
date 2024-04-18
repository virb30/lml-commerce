import { InputError } from "@modules/shared/errors/input.error";
import { HttpExceptionHandlerFactory } from "./http-exception-handler.factory";
import { HttpExceptionHandler } from "./http-exception-handler.interface";
import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { NotFoundError } from "@modules/shared/errors/not-found.error";

describe("HttpExceptionHandlerFactory tests", () => {
  let handler: HttpExceptionHandler;
  beforeEach(() => {
    handler = HttpExceptionHandlerFactory.create();
  });

  it("should throw BadRequestException on InputError", () => {
    expect(() => {
      handler.handle(new InputError("Input error"));
    }).toThrowErrorTypeWithMessage(BadRequestException, "Input error");
  });

  it("should throw NotFoundException on NotFoundError", () => {
    expect(() => {
      handler.handle(new NotFoundError("Not found error"));
    }).toThrowErrorTypeWithMessage(NotFoundException, "Not found error");
  });

  it("should throw InternalServerErrorException on any unhandled Error", () => {
    expect(() => {
      handler.handle(new Error("Internal server error"));
    }).toThrowErrorTypeWithMessage(InternalServerErrorException, "Internal server error");
  });
});
