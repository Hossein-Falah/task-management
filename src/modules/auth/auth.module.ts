import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { providers } from "./auth.provider";

@Module({
  controllers: [AuthController],
  providers
})
export class AuthModule {}
