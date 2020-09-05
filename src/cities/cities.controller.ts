import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { CityService } from './cities.service';
import { Response } from 'express';
import { CityDto } from './interfaces/citiy.dto';
import { City } from 'src/entities/cities.entity';

@Controller('api/cities')
export class CityController {
    constructor(private readonly cityService: CityService) {}
    @Get()
    findAllCities() : Promise<City[]>{
      return this.cityService.findAllCities();
    }

    @Get(':id')
    async findOneCity(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const city =  await this.cityService.findOneCity(id);
            return res.status(HttpStatus.OK).json(city);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createCity(@Body() cityDto : CityDto , @Res() res: Response): Promise<Response> {
      try {
          await this.cityService.insertCity(cityDto);
          return res.status(200).json({message: 'City Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
    @Delete('delete')
    async deleteCity(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.cityService.deleteCity(ids);
          return res.status(200).json({message: 'City Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    @Put('update/:id')
    async updateCity(@Param('id') id: number , @Body() body: CityDto, @Res() res: Response): Promise<Response> {
        try {
          await this.cityService.updateCity(id, body);
          return res.status(200).json({message: 'City Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
