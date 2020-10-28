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

    async findAllFavorites(student:number) {
       return await this.favoriteRepository.find({
           where:{
               student
           },
           order:{
               createdAt:"DESC"
           },
           relations :['teacher' , 'teacher.city' , 'teacher.nationality' , 'teacher.subjects' , 'teacher.levels']
       });
    }

    async deleteFavorite(id: number) {
        return await  this.favoriteRepository.delete(id);
    }

    async updateFavorite(id: number, data: FavoriteDto) {
        return await this.favoriteRepository.update(id, data);
    }
      
}
