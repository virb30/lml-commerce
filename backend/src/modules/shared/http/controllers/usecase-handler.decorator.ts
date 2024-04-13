import { Usecase } from "@modules/shared/usecase/usecase.interface";
import { HttpExceptionHandler } from "../http-exception/http-exception-handler.interface";

export class UsecaseHandler {
  constructor(
    private usecase: Usecase,
    private exceptionHandler: HttpExceptionHandler,
  ) {}

  async execute(input?: any): Promise<any> {
    try {
      return await this.usecase.execute(input);
    } catch (error: any) {
      this.exceptionHandler.handle(error);
    }
  }
}
