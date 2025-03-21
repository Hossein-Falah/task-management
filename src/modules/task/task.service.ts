import { Inject, Injectable } from '@nestjs/common';
import { TaskDto, UpdateTaskDto } from './dto/task.dto';
import { TASK_REPOSITORY } from './constants/token.constant';
import { ITaskRepository } from './interfaces/task-repository.interface';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY) private taskRepository: ITaskRepository
  ) { }
  
  create(taskDto: TaskDto) {
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, taskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
