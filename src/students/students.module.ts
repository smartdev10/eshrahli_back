import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentService } from './students.service';
import { StudentController } from './students.controller';
import { Student } from 'src/entities/students.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Student])],
    controllers: [StudentController],
    providers: [StudentService],
})
export class StudentModule {}
