import { Module } from "@nestjs/common";
import { ConfigModuleOptions, ConfigModule as NestConfigModule } from "@nestjs/config";
import { join } from "path";
import dataSourceConfig from "./data.source";

type DB_SCHEMA_TYPE = {
  DB_TYPE: "mysql" | "sqlite";
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
};

export type CONFIG_SCHEMA_TYPE = DB_SCHEMA_TYPE;

@Module({})
export class ConfigModule extends NestConfigModule {
  static forRoot(options?: ConfigModuleOptions) {
    const { envFilePath, ...otherOptions } = options ?? {};

    return super.forRoot({
      isGlobal: true,
      envFilePath: [
        ...(Array.isArray(envFilePath) ? envFilePath! : [envFilePath!]),
        join(process.cwd(), `.env.${process.env.NODE_ENV!}`),
        join(process.cwd(), ".env"),
      ],
      ...otherOptions,
      load: [dataSourceConfig, ...(Array.isArray(otherOptions?.load) ? otherOptions.load : [])],
    });
  }
}
