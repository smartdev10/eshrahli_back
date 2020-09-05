import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { Response } from 'express';
import { SubjectDto } from './interfaces/subject.dto';
import { Subject } from 'src/entities/subjects.entity';

@Controller('api/subjects')
export class SubjectsController {
    constructor(private readonly subjectService: SubjectsService) {}
    @Get()
    findAllMaterials() : Promise<Subject[]>{
      return this.subjectService.findAllMaterials();
    }

    @Get(':id')
    async findOneMaterial(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const material =  await this.subjectService.findOneMaterial(id);
            return res.status(HttpStatus.OK).json(material);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createMaterial(@Body() body : SubjectDto , @Res() res: Response): Promise<Response> {
      try {
          await this.subjectService.insertMaterial(body);
          return res.status(200).json({message: 'Subject Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
    @Delete('delete')
    async deleteMaterial(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.subjectService.deleteMaterial(ids);
          return res.status(200).json({message: 'Subject Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    @Put('update/:id')
    async updateMaterial(@Param('id') id: number , @Body() body: SubjectDto, @Res() res: Response): Promise<Response> {
        try {
          await this.subjectService.updateMaterial(id, body);
          return res.status(200).json({message: 'Subject Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
