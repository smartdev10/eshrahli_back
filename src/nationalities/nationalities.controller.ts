import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { NationalityService } from './nationalities.service';
import { Response } from 'express';
import { NationaltyDto } from './interfaces/nationality.dto';
import { Nationality } from 'src/entities/nationalities.entity';

@Controller('api/nationalities')
export class NationaltyController {
    constructor(private readonly nationalityService: NationalityService) {}
    @Get()
    findAllNationalties() : Promise<Nationality[]>{
      return this.nationalityService.findAllNationalities();
    }

    @Get(':id')
    async findOneNationalty(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const nationality =  await this.nationalityService.findOneNationality(id);
            return res.status(HttpStatus.OK).json(nationality);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createNationalty(@Body() body : NationaltyDto , @Res() res: Response): Promise<Response> {
      try {
          await this.nationalityService.insertNationality(body);
          return res.status(200).json({message: 'Nationalty Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
    @Delete('delete')
    async deleteNationalty(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.nationalityService.deleteNationality(ids);
          return res.status(200).json({message: 'Nationalty Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    @Put('update/:id')
    async updateNationalty(@Param('id') id: number , @Body() body: NationaltyDto, @Res() res: Response): Promise<Response> {
        try {
          await this.nationalityService.updateNationality(id, body);
          return res.status(200).json({message: 'Nationalty Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
