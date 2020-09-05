import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Teacher } from 'src/entities/teachers.entity';
import { NationaltyDto } from './interfaces/nationality.dto';
import { Nationality } from 'src/entities/nationalities.entity';


@Injectable()
export class NationalityService {
    
    constructor(
        @InjectRepository(Nationality)
        private nationalityRepository: Repository<Nationality>,
    ) {}

    async findOneNationality(id: number) {
        return await this.nationalityRepository.findOneOrFail(id)
    }
    async insertNationality(data : NationaltyDto ) {
        return await this.nationalityRepository.save(data);
    }

    async findAllNationalities() {
       return await this.nationalityRepository.find();
    }

    async deleteNationality(ids: number[]) {
        return await  this.nationalityRepository.delete(ids);
    }

    async updateNationality(id: number, data: NationaltyDto) {
        return await this.nationalityRepository.update(id, data);
    }
      
}
