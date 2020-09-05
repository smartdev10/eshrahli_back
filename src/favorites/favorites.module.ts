import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteService } from './favorites.service';
import { FavoriteController } from './favorites.controller';
import { Favorite } from 'src/entities/favorites.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Favorite])],
    controllers: [FavoriteController],
    providers: [FavoriteService],
})
export class FavoriteModule {}
