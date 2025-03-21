import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { providers } from "./auth.provider";
import { AuthController } from './auth.controller';
import { UserEntity } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AuthController],
  providers
})
export class AuthModule {}
