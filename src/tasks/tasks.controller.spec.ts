import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';

describe('TasksController', () => {
  let controller: TasksController;
  let service: TasksService;

  const mockTask: Task = {
    id: 1,
    titulo: 'Test Task',
    descripcion: 'Test description',
    estado: 'completado',
    createdAt: new Date(),
  };

  const mockTasksService = {
    createTask: jest.fn((dto: CreateTaskDto) => ({
      id: Date.now(),
      ...dto,
    })),
    getTasks: jest.fn(() => Promise.resolve([mockTask])),
    getTask: jest.fn((id: number) => Promise.resolve({ ...mockTask, id })),
    deleteTask: jest.fn((id: number) => Promise.resolve({ deleted: true })),
    updateTask: jest.fn((id: number, dto: UpdateTaskDto) =>
      Promise.resolve({...mockTask, ...dto }),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTasksService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTask', () => {
    it('should create a new task', () => {
      const dto: CreateTaskDto = { titulo: 'New Task', descripcion: 'Testing task', estado: 'completado' };
      expect(controller.createTask(dto)).toEqual({
        id: expect.any(Number),
        ...dto,
      });
      expect(service.createTask).toHaveBeenCalledWith(dto);
    });
  });

  describe('getTasks', () => {
    it('should return an array of tasks', async () => {
      await expect(controller.getTasks()).resolves.toEqual([mockTask]);
      expect(service.getTasks).toHaveBeenCalled();
    });
  });

  describe('getTask', () => {
    it('should return a task by id', async () => {
      await expect(controller.getTask(1)).resolves.toEqual({ ...mockTask, id: 1 });
      expect(service.getTask).toHaveBeenCalledWith(1);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task by id', async () => {
      await expect(controller.deleteTask(1)).resolves.toEqual({ deleted: true });
      expect(service.deleteTask).toHaveBeenCalledWith(1);
    });
  });

  describe('updateTask', () => {
    it('should update a task by id', async () => {
      const dto: UpdateTaskDto = { titulo: 'Updated title', estado: 'Completado' };
      await expect(controller.updateTask(1, dto)).resolves.toEqual({
        ...mockTask,
        ...dto,
      });
      expect(service.updateTask).toHaveBeenCalledWith(1, dto);
    });
  });
});
