import { Global, Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthGuard } from "./auth.guard";

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => {
        return {
          publicKey: configService.get("JWT_AUTH_PUBLIC_KEY"),
          privateKey: configService.get("JWT_AUTH_PRIVATE_KEY"),
          signOptions: {
            algorithm: "RS256",
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthGuard],
})
export class AuthModule {}
