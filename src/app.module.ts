import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || 'oscararm10',
      database: process.env.DB_DATABASE || 'tasksdb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true // usar solo en desarrollo
    }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://localhost:27017/tasksdb',
    ),
    TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
