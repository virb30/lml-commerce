import { BRLCurrency } from "@modules/shared/domain/value-object/currency/handlers/brl-currency";
import { CurrencyFactory } from "@modules/shared/domain/value-object/currency/currency.factory";
import { Global, Module } from "@nestjs/common";
import { readdirSync } from "fs";
import path from "path";
import { Currency } from "@modules/shared/domain/value-object/currency/currency";

@Global()
@Module({})
export class CurrencyModule {
  async onModuleInit() {
    const factory = CurrencyFactory.getInstance();

    const dirPath = path.join(__dirname, "..", "shared", "domain", "value-object", "currency", "handlers");

    console.log(dirPath);

    const files = readdirSync(dirPath).filter(
      (f) => !f.startsWith("_") && (f.endsWith("currency.ts") || f.endsWith("currency.js")),
    );

    for (const file of files) {
      const currencyCode = file.split("-")[0];
      const handler = Object.values(await import(`${dirPath}/${file}`));
      factory.register(currencyCode, handler[0]);
    }
  }
}
