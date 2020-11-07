import { Controller, Get, HttpStatus, Param, Render, Res , HttpException } from '@nestjs/common';
import { RequestService } from './requests/requests.service';
import ObjectsToCsv = require('objects-to-csv');
import { Response } from 'express';

@Controller()
export class AppController {

  constructor(private readonly requestService: RequestService) {}

  @Get()
  index() {
    return "Eshrahli";
  }

  @Get('export')
    async exportRequests(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const requests =  await this.requestService.findAllRequests();
            if(requests.length !== 0){
              const data = requests.map((req) => {
                return {
                  "اسم الطالب" : req.student.name,
                  "اسم المدرس" : req.teacher.name,
                  "موعد الحصة" : req.sessionDate,
                  "نوع البحث" : req.search_type,
                  "عدد الطلبة" : req.nstudents,
                  "المادة الدراسية" : req.subject.name,
                  "المرحلة الدراسية" : req.level.name,
                  "طريقة الدفع" : req.paymentMethod,
                  "مرجع الدفع" : req.paymentReference,
                  "تفاصيل" : req.details,
                  "المدينة" : req.city.name,
                  "المبلغ الإجمالي" : req.total,
                }
             })
             const csv = new ObjectsToCsv(data);
             await csv.toDisk(`./requests-${new Date().toISOString().replace(':' , '-')}.csv`);
             return res.status(HttpStatus.OK).json("Exported");
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
