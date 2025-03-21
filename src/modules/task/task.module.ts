import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { UserEntity } from '../user/entities/user.entity';
import { TaskEntity } from './entities/task.entity';
import { providers } from "./task.provider";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TaskEntity])
  ],
  controllers: [TaskController],
  providers,
})
export class TaskModule {}
