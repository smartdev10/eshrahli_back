import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { RequestService } from './requests.service';
import { Response } from 'express';
import { RequestDto , CheckOutRequestDto , UpdateRequestDto, RetryDto } from './interfaces/request.dto';
import { SRequest } from 'src/entities/requests.entity';
import { TeacherService } from 'src/teachers/teachers.service';
import { OneSignalService } from 'src/onesignal/onesignal.service';
import { ClientResponse } from 'onesignal-node/lib/types';

@Controller('api/requests')
export class RequestController {
    constructor(
        private readonly requestService: RequestService , 
        private readonly teacherService: TeacherService , 
        private readonly onesignalService: OneSignalService , 
        ) {}
    @Get()
    findAllCategory() : Promise<SRequest[]>{
      return this.requestService.findAllRequests();
    }

    @Get(':id')
    async findOneRequest(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const request =  await this.requestService.findOne(id);
            return res.status(HttpStatus.OK).json(request);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('retry')
    async retryRequest(@Body() data : RetryDto , @Res() res: Response): Promise<Response> {
      try {
          const frequest = await this.requestService.findOneRequest(data.id);
          if(frequest){
            const teachers = await this.teacherService.retrySearchTeachers({
              city:frequest.city,
              gender:frequest.teacher_gender,
              levels:frequest.level,
              subjects:frequest.subject 
            })
            const push_ids = teachers.map(({push_id})=> push_id ? push_id : '')
            let response : ClientResponse 
            if(push_ids.length !== 0 && push_ids.every((push) => push)){
              const notification = {
                contents: {
                  'en': `New Request`
                },
                include_player_ids: [...push_ids],
                data:{
                  RequestInfo:"test"
                }
              };
              response =  await this.onesignalService.client.createNotification(notification)
            }
            return res.status(200).json({message: 'Request Dispatched' , request : frequest , teachers , oneSignalResponse:response ? response.body : null });
          }
            throw new HttpException('Request Not Found', HttpStatus.BAD_REQUEST);
      } catch (error) {
          console.log(error)
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
          const frequest = await this.requestService.findOneRequest(request.id);
          const teachers = await this.teacherService.searchTeachers({
              city:frequest.city,
              gender:body.teacher_gender,
              levels:body.level,
              subjects:body.subject 
          })
          const push_ids = teachers.map(({push_id})=> push_id ? push_id : '')
          let response : ClientResponse 
          if(push_ids.length !== 0 && push_ids.every((push) => push)){
            const notification = {
              contents: {
                'en': `New Request`
              },
              include_player_ids: [...push_ids],
              data:{
                RequestInfo:"test"
              }
            };
            response =  await this.onesignalService.client.createNotification(notification)
          }
          return res.status(200).json({message: 'Request Created' , request : frequest , teachers , oneSignalResponse:response ? response.body : null });
      } catch (error) {
          console.log(error)
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
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
    async updateRequest(@Param('id') id: number , @Body() body: UpdateRequestDto, @Res() res: Response): Promise<Response> {
        try {
          await this.requestService.updateRequest(id, body);
          if(body.status === 'canceled'){
              const teacher = await this.teacherService.findOne(body.teacher)
              const notification = {
                contents: {
                  'en': `Request Canceled`
                },
                include_player_ids: [teacher.push_id],
                data:{
                  RequestInfo:"test"
                }
              };
              await this.onesignalService.client.createNotification(notification)
          }
          return res.status(200).json({message: 'Request Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Put('checkout/:id')
    async checkout(@Param('id') id: number , @Body() body: CheckOutRequestDto, @Res() res: Response): Promise<Response> {
        try {
          await this.requestService.checkoutRequest(id, body);
          const teacher = await this.teacherService.findOne(body.teacher)
          const notification = {
            contents: {
              'en': `Request Comfirmed`
            },
            include_player_ids: [teacher.push_id],
            data:{
              RequestInfo:"test"
            }
          };
          await this.onesignalService.client.createNotification(notification)
          return res.status(200).json({message: 'Request Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
