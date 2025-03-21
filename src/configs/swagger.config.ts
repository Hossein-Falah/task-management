import { ConfigService } from "@nestjs/config";
import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

const configService = new ConfigService();

export const SwaggerConfigInit = (app: INestApplication) => {
    const document = new DocumentBuilder()
        .setTitle("Task Management API")
        .setDescription("API for Task Management")
        .setVersion("1.0.0")
        .addBearerAuth(swaggerAuthConfig(), "Authorization")
        .build();

    const swaggerDoc = SwaggerModule.createDocument(app, document);
    SwaggerModule.setup(configService.get<string>("DOC_PATH") || "/api/docs", app, swaggerDoc);
};

const swaggerAuthConfig = (): SecuritySchemeObject => {
    return {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "Authorization",
        description: "JWT Authorization header using the Bearer scheme",
        in: "header",
    }
};