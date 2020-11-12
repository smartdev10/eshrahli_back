import { Controller, Get, HttpStatus, Param, Render, Res , HttpException } from '@nestjs/common';
import { RequestService } from './requests/requests.service';
import ObjectsToCsv = require('objects-to-csv');
import { Response } from 'express';
import { resolve } from 'path';
import { SRequest } from './entities/requests.entity';
import * as xlsx from 'json-as-xlsx';

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
            return res.redirect('/');
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
  }

  @Get('export/xlsx')
    async exportRequestsXlsx(@Param('id') id: number  ,  @Res() res: Response) {
      try {
            const requests =  await this.requestService.findAllRequests();
            var columns = [
              { label: 'اسم الطالب',  value: (row:SRequest) => (row.student ? row.student.name || '' : '') }, // Top level data
              { label: 'اسم المدرس', value: (row:SRequest) => (row.teacher ? row.teacher.name || '' : '') }, // Run functions
              { label: 'موعد الحصة', value: (row:SRequest) => (row.sessionDate ? row.sessionDate || '' : '') }, // Deep props
              { label: 'نوع البحث', value: (row:SRequest) => (row.search_type ? row.search_type || '' : '') }, // Deep props
              { label: 'عدد الطلبة', value: (row:SRequest) => (row.nstudents ? row.nstudents || '' : '') }, // Deep props
              { label: 'المادة الدراسية', value: (row:SRequest) => (row.subject ? row.subject.name || '' : '') }, // Deep props
              { label: 'المرحلة الدراسية', value: (row:SRequest) => (row.level ? row.level.name || '' : '') }, // Deep props
              { label: 'طريقة الدفع', value: (row:SRequest) => (row.paymentMethod ? row.paymentMethod || '' : '') }, // Deep props
              { label: 'مرجع الدفع', value: (row:SRequest) => (row.paymentReference ? row.paymentReference|| '' : '') }, // Deep props
              { label: 'تفاصيل', value: (row:SRequest) => (row.details ? row.details || '' : '') }, // Deep props
              { label: 'المدينة', value: (row:SRequest) => (row.city ? row.city.name || '' : '') }, // Deep props
              { label: 'المبلغ الإجمالي', value: (row:SRequest) => (row.total ? row.total|| '' : '') }, // Deep props

            ]
             
            if(requests.length !== 0){
             const filePath = `requests-${new Date().toISOString().replace(/:/gi, '-')}`
             const content = requests.map(req => {
                  return {
                    student:req.student,
                    teacher:req.teacher,
                    sessionDate:req.sessionDate,
                    search_type:req.search_type,
                    nstudents:req.nstudents,
                    subject:req.subject,
                    level:req.level,
                    paymentMethod:req.paymentMethod,
                    paymentReference:req.paymentReference,
                    details:req.details,
                    city:req.city,
                    total:req.total
                  }
             })
             const settings = {
              sheetName: 'Requests', // The name of the sheet
              fileName: filePath, // The name of the spreadsheet
              extraLength: 3, // A bigger number means that columns should be wider
              writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
            }
            xlsx(columns, content, settings, true) 
            }
            return res.redirect('/');
        } catch (error) {
          console.log(error)
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
