import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { BidsDto } from './interfaces/bids.dto';
import { Bid } from 'src/entities/bids.entity';


@Injectable()
export class BidsService {
    
    constructor(
        @InjectRepository(Bid)
        private bidsRepository: Repository<Bid>,
    ) {}

    async findOneBid(id: number) {
        return await this.bidsRepository.findOneOrFail(id)
    }
    async insertBid(data : BidsDto ) {
        return await this.bidsRepository.save(data);
    }

    async findAllBids(request:number) {
       return await this.bidsRepository.find({
           relations:['request' , 'teacher' , 'teacher.city' , 'teacher.nationality' , 'teacher.subjects' , 'teacher.levels'],
           where :{
               request
           },
           order:{
               createdAt:"DESC"
           }
       });
    }

    async deleteBids(ids: number[]) {
        return await  this.bidsRepository.delete(ids);
    }

    async updateBid(id: number, data: BidsDto) {
        return await this.bidsRepository.update(id, data);
    }
      
}
