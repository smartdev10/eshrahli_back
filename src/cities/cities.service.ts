import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CityDto } from './interfaces/citiy.dto';
import { City } from 'src/entities/cities.entity';


@Injectable()
export class CityService {
    
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) {}

    async findOneCity(id: number) {
        return await this.cityRepository.findOneOrFail(id)
    }
    async insertCity(data : CityDto ) {
        return await this.cityRepository.save(data);
    }

    async findAllCities() {
       return await this.cityRepository.find({
        order :{
            createdAt:"DESC"
          }
       });
    }

    async deleteCity(ids: number[]) {
        return await  this.cityRepository.delete(ids);
    }

    async updateCity(id: number, data: CityDto) {
        return await this.cityRepository.update(id, data);
    }
      
}
