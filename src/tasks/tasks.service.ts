import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task) private taskRepository: Repository<Task>,

    ){}

    async createTask(task: CreateTaskDto){

        const taskFound = await this.taskRepository.findOne({
            where: {
                titulo: task.titulo
            }
        })

        if (taskFound) {
            return new HttpException('Task already exits', HttpStatus.CONFLICT)            
        }

        const newTask = this.taskRepository.create(task);
        return this.taskRepository.save(newTask);
    }

    getTasks(){
        return this.taskRepository.find();
    }

    async getTask(id: number){
        const taskFound = await this.taskRepository.findOne({
            where: {
                id
            }
        })

        if (!taskFound) {
            return new HttpException('Task not found', HttpStatus.NOT_FOUND)            
        }

        return taskFound;

    }

    async deleteTask(id: number){
       const result = await this.taskRepository.delete({ id });

       if (result.affected === 0) {
            return new HttpException('Task Not Found', HttpStatus.NOT_FOUND);            
        }

        return result;
    }

    async updateTask(id: number, task: UpdateTaskDto){
        const taskFound = await this.taskRepository.findOne({
            where:{
                id
            }
        });       
        
        if (!taskFound) {
            return new HttpException('Task not found',HttpStatus.NOT_FOUND);            
        }

        const updateTask = Object.assign(taskFound, task);

        return await this.taskRepository.save(updateTask);
    }
}
