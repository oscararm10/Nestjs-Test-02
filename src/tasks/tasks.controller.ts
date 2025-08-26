import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService){}

    @Post()
    createTask(@Body() newTask: CreateTaskDto){
        return this.tasksService.createTask(newTask);    
    }

    @Get()
    getTasks(): Promise<Task[]>{
        return this.tasksService.getTasks();
    }

    @Get(':id')
    getTask(@Param('id', ParseIntPipe) id: number){        
        return this.tasksService.getTask(id);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number){
        return this.tasksService.deleteTask(id);
    }

    @Put(':id')
    updateTask(@Param('id', ParseIntPipe) id: number, @Body() task: UpdateTaskDto){
        return this.tasksService.updateTask(id, task)        
    }
}
