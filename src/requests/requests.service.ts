import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Teacher } from 'src/entities/teachers.entity';
import { CheckOutRequestDto, RequestDto, UpdateRequestDto } from './interfaces/request.dto';
import { SRequest } from 'src/entities/requests.entity';


@Injectable()
export class RequestService {
    
    constructor(
        @InjectRepository(SRequest)
        private requestRepository: Repository<SRequest>,
    ) {}

    async findOneRequest(id: number) {
        return await this.requestRepository.findOne({
            where :{
                id
            },
            relations:['subject' , 'level' , 'student' , 'student' , 'teacher' , 'teacher.city' , 'teacher.nationality' , 'city'],
        })
    }

    async findOne(request: number) {
        return await this.requestRepository.findOne(request,{
            relations:['subject' , 'level' , 'student' , 'teacher' ,'teacher.city' , 'teacher.nationality', 'city'],
        })
    }

    async insertRequest(data : RequestDto ) {
        return await this.requestRepository.save(data);
    }

    async findAllRequests() {
       return await this.requestRepository.find({
          relations:['subject' , 'level' , 'student' , 'teacher' ,'teacher.city' , 'teacher.nationality', 'city'],
          order :{
            createdAt:"DESC"
          }
       });
    }

    async deleteRequest(ids: number[]) {
        return await  this.requestRepository.delete(ids);
    }

    async updateRequest(id: number, data: UpdateRequestDto) {
        return await this.requestRepository.update(id, data);
    }

    async checkoutRequest(id: number, data: CheckOutRequestDto) {
        return await this.requestRepository.update(id, data);
    }
      
}
