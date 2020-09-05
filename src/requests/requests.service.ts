import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Teacher } from 'src/entities/teachers.entity';
import { RequestDto } from './interfaces/request.dto';
import { SRequest } from 'src/entities/requests.entity';


@Injectable()
export class RequestService {
    
    constructor(
        @InjectRepository(SRequest)
        private requestRepository: Repository<SRequest>,
    ) {}

    async findOneRequest(id: number) {
        return await this.requestRepository.findOneOrFail(id)
    }
    async insertRequest(data : RequestDto ) {
        return await this.requestRepository.save(data);
    }

    async findAllRequests() {
       return await this.requestRepository.find({});
    }

    async deleteRequest(ids: number[]) {
        return await  this.requestRepository.delete(ids);
    }

    async updateRequest(id: number, data: RequestDto) {
        return await this.requestRepository.update(id, data);
    }
      
}
