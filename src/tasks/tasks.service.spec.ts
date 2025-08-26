import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('TasksService', () => {
  let service: TasksService;
  let repository: Repository<Task>;

  const mockTask: Task = {
    id: 1,
    titulo: 'Test Task',
    descripcion: 'Test description',
    estado: 'Completado',
    createdAt: new Date(),
  };

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repository = module.get<Repository<Task>>(getRepositoryToken(Task));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createTask', () => {
    it('should create and return a new task', async () => {
      const dto: CreateTaskDto = { titulo: 'New Task', descripcion: 'Desc', estado: 'Completado' };

      (repository.findOne as jest.Mock).mockResolvedValue(null);
      (repository.create as jest.Mock).mockReturnValue(dto);
      (repository.save as jest.Mock).mockResolvedValue({ id: 1, ...dto });

      const result = await service.createTask(dto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { titulo: dto.titulo } });
      expect(repository.create).toHaveBeenCalledWith(dto);
      expect(repository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual({ id: 1, ...dto });
    });

    it('should throw HttpException if task already exists', async () => {
      const dto: CreateTaskDto = { titulo: 'New Task', descripcion: 'Desc', estado: 'Completado' };

      (repository.findOne as jest.Mock).mockResolvedValue(mockTask);

      const result = await service.createTask(dto);

      expect(result).toBeInstanceOf(HttpException);
      expect((result as HttpException).getStatus()).toBe(HttpStatus.CONFLICT);
    });
  });

  describe('getTasks', () => {
    it('should return all tasks', async () => {
      (repository.find as jest.Mock).mockResolvedValue([mockTask]);

      const result = await service.getTasks();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual([mockTask]);
    });
  });

  describe('getTask', () => {
    it('should return a task by id', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(mockTask);

      const result = await service.getTask(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockTask);
    });

    it('should return HttpException if not found', async () => {
      (repository.findOne as jest.Mock).mockResolvedValue(null);

      const result = await service.getTask(999);

      expect(result).toBeInstanceOf(HttpException);
      expect((result as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('deleteTask', () => {
    it('should delete a task successfully', async () => {
      (repository.delete as jest.Mock).mockResolvedValue({ affected: 1 });

      const result = await service.deleteTask(1);

      expect(repository.delete).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual({ affected: 1 });
    });

    it('should return HttpException if not found', async () => {
      (repository.delete as jest.Mock).mockResolvedValue({ affected: 0 });

      const result = await service.deleteTask(1);

      expect(result).toBeInstanceOf(HttpException);
      expect((result as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
    });
  });

  describe('updateTask', () => {
    it('should update and return a task', async () => {
      const dto: UpdateTaskDto = { titulo: 'Updated Task', estado: 'Completado' };

      (repository.findOne as jest.Mock).mockResolvedValue(mockTask);
      (repository.save as jest.Mock).mockResolvedValue({ ...mockTask, ...dto });

      const result = await service.updateTask(1, dto);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(repository.save).toHaveBeenCalledWith({ ...mockTask, ...dto });
      expect(result).toEqual({ ...mockTask, ...dto });
    });

    it('should return HttpException if task not found', async () => {
      const dto: UpdateTaskDto = { titulo: 'Updated Task', estado: 'Completado' };

      (repository.findOne as jest.Mock).mockResolvedValue(null);

      const result = await service.updateTask(1, dto);

      expect(result).toBeInstanceOf(HttpException);
      expect((result as HttpException).getStatus()).toBe(HttpStatus.NOT_FOUND);
    });
  });
});
