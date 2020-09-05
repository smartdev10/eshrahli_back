import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/teachers.entity';
import { TeacherService } from './teachers.service';
import { TeacherController } from './teachers.controller';
import { AuthTeacherController } from './auth.teacher.controller';
import { SubjectsService } from 'src/subjects/subjects.service';
import { LevelsService } from 'src/levels/levels.service';
import { Level } from 'src/entities/levels.entity';
import { Subject } from 'src/entities/subjects.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Teacher]) , TypeOrmModule.forFeature([Level]), TypeOrmModule.forFeature([Subject])],
    controllers: [TeacherController,AuthTeacherController],
    providers: [TeacherService,SubjectsService,LevelsService],
})
export class TeacherModule {}
