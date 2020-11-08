import { Controller, Get, HttpStatus, Param, Render, Res , HttpException } from '@nestjs/common';
import { RequestService } from './requests/requests.service';
import ObjectsToCsv = require('objects-to-csv');
import { Response } from 'express';
import { resolve } from 'path';

@Controller()
export class AppController {

  constructor(private readonly requestService: RequestService) {}

  @Get()
  index() {
    return "Eshrahli";
  }

  @Get('export')
    async exportRequests(@Param('id') id: number  ,  @Res() res: Response) {
      try {
            const requests =  await this.requestService.findAllRequests();
            if(requests.length !== 0){
              const data = requests.map((req) => {
                return {
                  "اسم الطالب" : req.student?.name || null,
                  "اسم المدرس" : req.teacher?.name || null,
                  "موعد الحصة" : req.sessionDate || null,
                  "نوع البحث" : req.search_type || null,
                  "عدد الطلبة" : req.nstudents || null,
                  "المادة الدراسية" : req.subject?.name || null,
                  "المرحلة الدراسية" : req.level?.name || null,
                  "طريقة الدفع" : req.paymentMethod || null,
                  "مرجع الدفع" : req.paymentReference || null,
                  "تفاصيل" : req.details || null,
                  "المدينة" : req.city.name || null,
                  "المبلغ الإجمالي" : req.total || null,
                }
             })
             const csv = new ObjectsToCsv(data);
             const filePath = __dirname + `/../csv/requests-${new Date().toISOString().replace(/:/gi, '-')}.csv`
             await csv.toDisk(filePath);
             console.log(resolve(filePath))
             return res.download(resolve(filePath))
            }
            return res.status(HttpStatus.OK).json("Exported");
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

  @Get('/payment/:id')
  @Render('index')
  async payement(@Param('id') id : number) {
    if(id){
      const request = await this.requestService.findOne(id)
      if(request){
        return { id , total:request.total };
      }
      return 'Request Not Found!!'
    }
    return 'Request Id Not Valid!!'
  }

  @Get('/redirect')
  @Render('redirect')
  redirect() {
    return { message: 'Hello world!' };
  }
}
