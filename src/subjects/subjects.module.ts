import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { Subject } from 'src/entities/subjects.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Subject])],
    controllers: [SubjectsController],
    providers: [SubjectsService],
})
export class SubjectsModule {}
