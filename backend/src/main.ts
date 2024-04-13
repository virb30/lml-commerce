import { NestFactory } from "@nestjs/core";
import { AppModule } from "./modules/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const port = parseInt(process.env.PORT ?? "8008");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("LML Commerce")
    .setDescription("LML Commerce API")
    .setVersion("1.0")
    .addOAuth2({
      type: "oauth2",
      description: "Keycloak",
      name: "Keycloak",
      flows: {
        password: {
          scopes: {
            email: "Email",
            roles: "Roles",
            profile: "Profile",
            openid: "User id",
          },
          tokenUrl: "http://localhost:8080/realms/lml-commerce/protocol/openid-connect/token",
          authorizationUrl: "http://localhost:8080/realms/lml-commerce/protocol/openid-connect/auth",
        },
      },
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(port);
}

bootstrap();
