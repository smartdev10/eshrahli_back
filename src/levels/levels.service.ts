import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { LevelDto } from './interfaces/level.dto';
import { Level } from 'src/entities/levels.entity';


@Injectable()
export class LevelsService {
    
    constructor(
        @InjectRepository(Level)
        private levelRepository: Repository<Level>,
    ) {}

    async findOneLevel(id: number) {
        return await this.levelRepository.findOneOrFail(id)
    }
    async insertLevel(data : LevelDto ) {
        return await this.levelRepository.save(data);
    }

    async findAllLevels() {
       return await this.levelRepository.find({});
    }

    async findByIds(ids : Level[]) {
        return await this.levelRepository.findByIds(ids);
    }

    async deleteLevel(ids: number[]) {
        return await  this.levelRepository.delete(ids);
    }

    async updateLevel(id: number, data: LevelDto) {
        return await this.levelRepository.update(id, data);
    }
      
}
