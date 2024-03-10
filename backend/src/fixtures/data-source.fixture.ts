import { registerAs } from "@nestjs/config";

export const registerDataSource = (source: string) => {
  return registerAs("data", () => ({ source }));
};
