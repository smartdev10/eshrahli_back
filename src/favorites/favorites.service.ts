import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FavoriteDto } from './interfaces/favorites.dto';
import { Favorite } from 'src/entities/favorites.entity';


@Injectable()
export class FavoriteService {
    
    constructor(
        @InjectRepository(Favorite)
        private favoriteRepository: Repository<Favorite>,
    ) {}

    async findOneFavorite(id: number) {
        return await this.favoriteRepository.findOneOrFail(id)
    }
    async insertFavorite(data : FavoriteDto ) {
        return await this.favoriteRepository.save(data);
    }

    async findAllFavorites() {
       return await this.favoriteRepository.find({
           relations :['teacher' , 'teacher.city' , 'teacher.nationality' , 'teacher.subjects' , 'teacher.levels']
       });
    }

    async deleteFavorite(ids: number[]) {
        return await  this.favoriteRepository.delete(ids);
    }

    async updateFavorite(id: number, data: FavoriteDto) {
        return await this.favoriteRepository.update(id, data);
    }
      
}
