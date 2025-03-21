import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { ITaskService } from './interfaces/task-service.interface';
import { TaskDto, UpdateTaskDto } from './dto/task.dto';
import { TASK_SERVICE } from './constants/token.constant';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';

@Controller('task')
@ApiTags("Task")
@AuthDecorator()
export class TaskController {
  constructor(
    @Inject(TASK_SERVICE) private taskService: ITaskService,
  ) {}

  @Post()
  create(@Body() taskDto: TaskDto) {
    return this.taskService.create(taskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() taskDto: UpdateTaskDto) {
    return this.taskService.update(id, taskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
