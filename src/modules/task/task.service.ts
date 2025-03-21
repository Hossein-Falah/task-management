import { Request } from 'express';
import { DeepPartial } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { TaskDto, UpdateTaskDto } from './dto/task.dto';
import { TASK_REPOSITORY } from './constants/token.constant';
import { ITaskRepository } from './interfaces/task-repository.interface';
import { ITaskService } from './interfaces/task-service.interface';
import { MulterFile } from 'src/common/utils/multer.util';
import { TaskEntity } from './entities/task.entity';
import { TaskMessage } from 'src/common/enum/message.enum';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable({ scope: Scope.REQUEST })
export class TaskService implements ITaskService {
  constructor(
    @Inject(TASK_REPOSITORY) private taskRepository: ITaskRepository,
    @Inject(REQUEST) private request: Request,
    private configService: ConfigService
  ) { }

  async createTask(taskDto: TaskDto, attchment: MulterFile): Promise<{ message: string}> {
    const { id } = this.request.user;

    const { title, description } = taskDto;

    await this.checkExistTaskWithTitle(title);

    if (attchment) {
      const normalizePath = attchment.path.replace(/\\/g, "/");

      const fileName = normalizePath.split("/").pop();

      const generateShortLink = `${this.configService.get<string>("APP_URL")}/uploads/task_attchment/${fileName}`;

      taskDto.attchment = generateShortLink;
    }

    await this.taskRepository.createTask({ 
      title, description,
      attchment: taskDto.attchment,
      userId: id
    })
    
    return { 
      message: TaskMessage.TASK_CREATED
    }
  }

  async findAll(paginationDto: PaginationDto): Promise<{ tasks: TaskEntity[], pagination: PaginationDto }> {
    const { id } = this.request.user;
    return await this.taskRepository.findAll(id, paginationDto);
  }

  async findOne(id: string): Promise<TaskEntity | null> {
    const { id: userId } = this.request.user;
    const task = await this.taskRepository.findById(id, userId);
    if (!task) throw new BadRequestException(TaskMessage.TASK_NOT_FOUND);
    return task;
  }

  async update(id: string, taskDto: UpdateTaskDto): Promise<{ message: string }> {
    const { id: userId } = this.request.user;
    const { title, description } = taskDto;
    const task = await this.taskRepository.findById(id, userId);
    if (!task) throw new BadRequestException(TaskMessage.TASK_NOT_FOUND);

    await this.checkExistTaskWithTitle(title);

    const updateTask: DeepPartial<TaskEntity> = {
      title: title || task.title,
      description: description || task.description,
      attchmentUrl: task.attchmentUrl
    }

    await this.taskRepository.updateInformation(id, updateTask);

    return {
      message: TaskMessage.TASK_UPDATED
    }
  }

  async remove(id: string): Promise<{ message: string }> {
    const { id: userId } = this.request.user;
    const task = await this.taskRepository.findById(id, userId);
    if (!task) throw new BadRequestException(TaskMessage.TASK_NOT_FOUND);
    await this.taskRepository.delete(id);

    return {
      message: TaskMessage.TASK_DELETED
    }
  }

  async checkExistTaskWithTitle(title: string): Promise<void> {
    const task = await this.taskRepository.findByTitle(title);
    if (task) throw new BadRequestException(TaskMessage.TASK_ALREADY_EXIST);
  }
}
