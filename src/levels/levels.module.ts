import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LevelsService } from './levels.service';
import { LevelController } from './levels.controller';
import { Level } from 'src/entities/levels.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Level])],
    controllers: [LevelController],
    providers: [LevelsService],
})
export class LevelsModule {}
