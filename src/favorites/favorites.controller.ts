import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { FavoriteService } from './favorites.service';
import { Response } from 'express';
import { FavoriteDto } from './interfaces/favorites.dto';
import { Favorite } from 'src/entities/favorites.entity';

@Controller('api/favorites')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) {}
    @Get()
    findAllFavorites() : Promise<Favorite[]>{
      return this.favoriteService.findAllFavorites();
    }

    @Get(':id')
    async findOneFavorite(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const nationality =  await this.favoriteService.findOneFavorite(id);
            return res.status(HttpStatus.OK).json(nationality);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createFavorite(@Body() body : FavoriteDto , @Res() res: Response): Promise<Response> {
      try {
          await this.favoriteService.insertFavorite(body);
          return res.status(200).json({message: 'Favorite Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
    @Delete('delete')
    async deleteFavorite(@Body('ids') ids :number[], @Res() res: Response): Promise<Response> {
        try {
          await this.favoriteService.deleteFavorite(ids);
          return res.status(200).json({message: 'Favorite Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    @Put('update/:id')
    async updateFavorite(@Param('id') id: number , @Body() body: FavoriteDto, @Res() res: Response): Promise<Response> {
        try {
          await this.favoriteService.updateFavorite(id, body);
          return res.status(200).json({message: 'Favorite Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
