import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { RequestService } from './requests.service';
import { Response } from 'express';
import { RequestDto } from './interfaces/request.dto';
import { SRequest } from 'src/entities/requests.entity';
import { TeacherService } from 'src/teachers/teachers.service';

@Controller('api/requests')
export class RequestController {
    constructor(private readonly requestService: RequestService , private readonly teacherService: TeacherService) {}
    @Get()
    findAllCategory() : Promise<SRequest[]>{
      return this.requestService.findAllRequests();
    }

    @Get(':id')
    async findOneRequest(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const request =  await this.requestService.findOneRequest(id);
            return res.status(HttpStatus.OK).json(request);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createRequest(@Body() body : RequestDto , @Res() res: Response): Promise<Response> {
      try {
          const request = await this.requestService.insertRequest(body);
          const teachers = await this.teacherService.searchTeachers()
          return res.status(200).json({message: 'Request Created'});
      } catch (error) {
          console.log(error.detail)
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.detail,
          }, 400);
      }
    }
    @Delete('delete')
    async deleteRequest(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.requestService.deleteRequest(ids);
          return res.status(200).json({message: 'Request Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    @Put('update/:id')
    async updateRequest(@Param('id') id: number , @Body() body: RequestDto, @Res() res: Response): Promise<Response> {
        try {
          await this.requestService.updateRequest(id, body);
          return res.status(200).json({message: 'Request Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
