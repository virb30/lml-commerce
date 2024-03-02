import { ConfigService } from "@nestjs/config";
import { CONFIG_SCHEMA_TYPE } from "../config/config.module";
import { DbConnectionFactory, DbConnectionOptions } from "./factory/connection-adapter.factory";

export const CONNECTION_PROVIDER_TOKEN = "CONNECTION";

export const databaseProvider = {
  provide: CONNECTION_PROVIDER_TOKEN,
  useFactory: (configService: ConfigService<CONFIG_SCHEMA_TYPE>) => {
    const dbType = configService.get("DB_TYPE");
    const dbOptions: DbConnectionOptions = {
      dbHost: configService.get("DB_HOST"),
      dbName: configService.get("DB_NAME"),
      dbPass: configService.get("DB_PASS"),
      dbPort: configService.get("DB_PORT"),
      dbUser: configService.get("DB_USER"),
    };
    return DbConnectionFactory.make(dbType, dbOptions);
  },
  inject: [ConfigService],
};
