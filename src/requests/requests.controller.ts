import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { RequestService } from './requests.service';
import { Response } from 'express';
import { RequestDto , CheckOutRequestDto , UpdateRequestDto, RetryDto, ReCallDto, FinishRequestDto } from './interfaces/request.dto';
import { SRequest } from 'src/entities/requests.entity';
import { TeacherService } from 'src/teachers/teachers.service';
import { TeacherOneSignalService } from 'src/onesignal/teacherSignal.service';
import { ClientResponse } from 'onesignal-node/lib/types';
import { NotificationService } from 'src/notifications/notifications.service';
import { StudentOneSignalService } from 'src/onesignal/studentSignal.service';
import { sign } from 'jsonwebtoken';
import fetch from 'node-fetch';

@Controller('api/requests')
export class RequestController {
    constructor(
        private readonly requestService: RequestService, 
        private readonly teacherService: TeacherService, 
        private readonly onesignalService: TeacherOneSignalService, 
        private readonly studentOneSignalService: StudentOneSignalService, 
        private readonly notifyService: NotificationService
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
            const push_ids = teachers.map(({push_id})=> push_id)
            let response : ClientResponse 
            if(push_ids.length !== 0){
              const notification = {
                contents: {
                  'en': `طلب جديد`
                },
                include_player_ids: [...push_ids.filter(push => push.length !== 0)],
                data:{
                  request_id:frequest.id
                }
              };
              response =  await this.onesignalService.client.createNotification(notification)
              for (const teacher of teachers) {
                await this.notifyService.insertTeacherNotification({
                  message:"طلب جديد",
                  teacher,
                  request:frequest
                })
              }
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

    @Post('recall')
    async recreateRequest(@Body() data : ReCallDto , @Res() res: Response): Promise<Response> {
      try {
          const frequest = await this.requestService.findOneRequest(data.id);
          delete frequest.id
          delete frequest.createdAt
          delete frequest.updatedAt
          delete frequest.status
          delete frequest.lesson_end_time
          delete frequest.lesson_start_time
          delete frequest.total
          delete frequest.paid
          delete frequest.payementReference
          delete frequest.paymentMethod
          delete frequest.zoomLink
          delete frequest.canceledBy
          delete frequest.cancellationDate
          delete frequest.discount_amount
          delete frequest.bids
          delete data.id
          const request = await this.requestService.recallRequest({...frequest,...data});
          const newrequest = await this.requestService.findOneRequest(request.id);
          if(frequest){
            const teachers = await this.teacherService.retrySearchTeachers({
              city:newrequest.city,
              gender:newrequest.teacher_gender,
              levels:newrequest.level,
              subjects:newrequest.subject
            })
            const push_ids = teachers.map(({push_id})=> push_id)
            let response : ClientResponse 
            if(push_ids.length !== 0){
              const notification = {
                contents: {
                  'en': `طلب جديد`
                },
                include_player_ids: [...push_ids.filter(push => push.length !== 0)],
                data:{
                  request_id:request.id
                }
              };
              response =  await this.onesignalService.client.createNotification(notification)
              for (const teacher of teachers) {
                await this.notifyService.insertTeacherNotification({
                  message:"طلب جديد",
                  teacher,
                  request:frequest
                })
              }
            }
            return res.status(200).json({message: 'Request Recalled' , request : newrequest , teachers , oneSignalResponse:response ? response.body : null });
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
          const push_ids = teachers.map(({push_id})=> push_id)
          let response : ClientResponse 
          if(push_ids.length !== 0){
            const notification = {
              contents: {
                'en': 'طلب جديد'
              },
              include_player_ids: [...push_ids.filter(push => push.length !== 0)],
              data:{
                request_id:frequest.id
              }
            };
            response =  await this.onesignalService.client.createNotification(notification)
            console.log('created notification')
            for (const teacher of teachers) {
              await this.notifyService.insertTeacherNotification({
                message:"طلب جديد",
                teacher,
                request:frequest
              })
           }
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


    @Put('update/reference/:id')
    async updateReference(@Param('id') id: number , @Body() body: FinishRequestDto, @Res() res: Response): Promise<Response> {
        try {
          await this.requestService.updateReference(id,body);
          return res.status(HttpStatus.OK).json({message: 'Request Reference Updated'});
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
          const frequest = await this.requestService.findOneRequest(id);
          if(frequest){
              if(frequest.status === 'canceled'){
                const teacher = await this.teacherService.findOne(body.teacher)
                if(teacher.push_id){
                  const notification = {
                    contents: {
                      'en': `تم إلغاء الطلب`
                    },
                    include_player_ids: [teacher.push_id],
                    data:{
                      request_id:frequest.id
                    }
                  };
                  await this.onesignalService.client.createNotification(notification)
                  await this.notifyService.insertTeacherNotification({
                    message:"تم إلغاء الطلب",
                    teacher,
                    request:frequest
                  })
                }
            }
            if(frequest.status === "CONFIRMED"){
              if(frequest.is_remote){
                const payload = {
                  iss: process.env.ZOOM_APP_KEY,
                  exp: ((new Date()).getTime() + 5000)
                };
                const access_token  = sign(payload, process.env.ZOOM_API_SECRET);
                console.log(access_token,process.env.ZOOM_APP_KEY,process.env.ZOOM_API_SECRET)
                const init =  { 
                  method: 'post', 
                  headers: {
                    'Authorization': 'Bearer '+access_token, 
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                     start_time: frequest.sessionDate,
                     settings: {
                      host_video: "true",
                      participant_video: "true"
                    }
                  })
                }
                const response = await fetch(`https://api.zoom.us/v2/users/eshrahley@gmail.com/meetings`,init);
                const json = await response.json();
                console.log(json)
                await this.requestService.updateRequest(id, {...frequest,zoomLink:"test"});
              }
            }
            if(frequest.lesson_end_time){
              const teacher = await this.teacherService.findOne(body.teacher)
              if(frequest.student.push_id){
                const notification = {
                  contents: {
                    'en': `الدرس ${teacher.name} أنهى`
                  },
                  include_player_ids: [frequest.student.push_id],
                  data:{
                    request_id:frequest.id
                  }
                };
                await this.studentOneSignalService.client.createNotification(notification)
                await this.notifyService.insertStudentNotification({
                  message: `الدرس ${teacher.name} أنهى`,
                  student:frequest.student,
                  request:frequest
                })
              }
            }
            if(body.lesson_start_time){
                const teacher = await this.teacherService.findOne(body.teacher)
                if(frequest.student.push_id){
                  const notification = {
                    contents: {
                      'en': `الدرس ${teacher.name} بدأ`
                    },
                    include_player_ids: [frequest.student.push_id],
                    data:{
                      request_id:frequest.id
                    }
                  };
                  await this.studentOneSignalService.client.createNotification(notification)
                  await this.notifyService.insertStudentNotification({
                    message: `الدرس ${teacher.name} بدأ`,
                    student:frequest.student,
                    request:frequest
                  })
                }
            }
            return res.status(200).json({message: 'Request Updated'});
          }
          throw new HttpException('Request Not Found', 400);
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
          if(teacher.push_id){
            const frequest = await this.requestService.findOneRequest(id);
            const notification = {
              contents: {
                'en': 'تم تأكيد الطلب'
              },
              include_player_ids: [teacher.push_id],
              data:{
                request_id:frequest.id
              }
            };
            await this.onesignalService.client.createNotification(notification)
            await this.notifyService.insertTeacherNotification({
              message:"تم تأكيد الطلب",
              teacher,
              request:frequest
            })
            return res.status(200).json({message: 'Request Updated'});
          }
          return res.status(200).json({message: 'Request Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
