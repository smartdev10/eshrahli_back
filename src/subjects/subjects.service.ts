import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { SubjectDto } from './interfaces/subject.dto';
import { Subject } from 'src/entities/subjects.entity';


@Injectable()
export class SubjectsService {
    
    constructor(
        @InjectRepository(Subject)
        private subjectRepository: Repository<Subject>,
    ) {}

    async findOneMaterial(id: number) {
        return await this.subjectRepository.findOneOrFail(id)
    }
    async insertMaterial(data : SubjectDto ) {
        return await this.subjectRepository.save(data);
    }

    async findAllMaterials() {
       return await this.subjectRepository.find({});
    }

    async findByIds(ids : Subject[]) {
        return await this.subjectRepository.findByIds(ids);
     }

    async deleteMaterial(ids: number[]) {
        return await  this.subjectRepository.delete(ids);
    }

    async updateMaterial(id: number, data: SubjectDto) {
        return await this.subjectRepository.update(id, data);
    }
      
}
