import { Global, Module } from "@nestjs/common";
import { httpExceptionHandlerProvider } from "./shared.provider";

@Global()
@Module({
  providers: [httpExceptionHandlerProvider.HTTP_EXCEPTION_HANDLER],
  exports: [httpExceptionHandlerProvider.HTTP_EXCEPTION_HANDLER],
})
export class SharedModule {}
