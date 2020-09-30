import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelsService } from './levels.service';
import { LevelController } from './levels.controller';
import { Level } from 'src/entities/levels.entity';
import { SubjectsService } from 'src/subjects/subjects.service';
import { Subject } from 'src/entities/subjects.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Level]) ,TypeOrmModule.forFeature([Subject])],
    controllers: [LevelController],
    providers: [LevelsService , SubjectsService],
})
export class LevelsModule {}
