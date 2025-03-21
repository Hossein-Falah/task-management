import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app/app.module';
import { SwaggerConfigInit } from './configs/swagger.config';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const configService = app.get(ConfigService);
  SwaggerConfigInit(app);
  app.useStaticAssets("public")
  await app.listen(configService.get<number>("APP_PORT") ?? 3000, () => {
    console.log(`Server is running or http://localhost:${configService.get<number>("APP_PORT")}`);
    console.log(`Swagger is running http://localhost:${configService.get<number>("APP_PORT")}${configService.get<string>("DOC_PATH")}`);
  });
}
bootstrap();
