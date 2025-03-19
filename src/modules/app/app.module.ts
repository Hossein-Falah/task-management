import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { typeOrmConfig } from 'src/configs/databases/typeorm.config';

import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService:ConfigService) => typeOrmConfig(configService),
      inject: [ConfigService]
    }),
    UserModule,
    AuthModule, 
    TaskModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
