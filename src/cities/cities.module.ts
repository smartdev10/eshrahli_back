import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityService } from './cities.service';
import { CityController } from './cities.controller';
import { City } from 'src/entities/cities.entity';

@Module({
    imports: [TypeOrmModule.forFeature([City])],
    controllers: [CityController],
    providers: [CityService],
})
export class CityModule {}
