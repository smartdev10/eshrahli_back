import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NationalityService } from './nationalities.service';
import { NationaltyController } from './nationalities.controller';
import { Nationality } from 'src/entities/nationalities.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Nationality])],
    controllers: [NationaltyController],
    providers: [NationalityService],
})
export class NationalityModule {}
