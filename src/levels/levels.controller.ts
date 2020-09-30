import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { Response } from 'express';
import { LevelDto } from './interfaces/level.dto';
import { Level } from 'src/entities/levels.entity';
import { SubjectsService } from 'src/subjects/subjects.service';

@Controller('api/levels')
export class LevelController {
        
        constructor(private readonly levelService: LevelsService , private readonly subjectService: SubjectsService) {}
    @Get()
    findAllLevels() : Promise<Level[]>{
      return this.levelService.findAllLevels();
    }

    @Get(':id')
    async findOneCategory(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const level =  await this.levelService.findOneLevel(id);
            return res.status(HttpStatus.OK).json(level);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createCategory(@Body() data : LevelDto , @Res() res: Response): Promise<Response> {
      try {
          let subjects = []
          if(data.subjects){
            subjects = await this.subjectService.findByIds(data.subjects)
          }
          data.subjects = subjects
          await this.levelService.insertLevel(data);
          return res.status(200).json({message: 'Level Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
    @Delete('delete')
    async deleteCategory(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.levelService.deleteLevel(ids);
          return res.status(200).json({message: 'Level Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    @Put('update/:id')
    async updateCategory(@Param('id') id: number , @Body() body: LevelDto, @Res() res: Response): Promise<Response> {
        try {
            let subjects = []
            if(body.subjects){
                subjects = await this.subjectService.findByIds(body.subjects)
            }
            body.subjects = subjects
            await this.levelService.updateLevel(body);
          return res.status(200).json({message: 'Level Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
