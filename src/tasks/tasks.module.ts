import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Tasks, TasksSchema } from './tasks.schema';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), MongooseModule.forFeature([{ name: Tasks.name, schema: TasksSchema }])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
