import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './modules/app/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerConfigInit } from './configs/swagger.config';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService)
  SwaggerConfigInit(app);
  await app.listen(configService.get<number>("APP_PORT") ?? 3000, () => {
    console.log(`Server is running or http://localhost:${configService.get<number>("APP_PORT")}`);
    console.log(`Swagger is running http://localhost:${configService.get<number>("APP_PORT")}${configService.get<string>("DOC_PATH")}`);
  });
}
bootstrap();
