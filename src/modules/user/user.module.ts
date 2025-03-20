import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { USER_REPOSITORY, USER_SERVICE } from './constants/token.constant';
import { providers } from './user.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [UserController],
  providers,
  exports: [USER_SERVICE, USER_REPOSITORY]
})
export class UserModule {}
