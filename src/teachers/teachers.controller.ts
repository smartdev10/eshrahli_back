import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { TeacherService } from './teachers.service';
import { Response } from 'express';
import { UpdateTeacherDto , CreateTeacherDto, UpdateTeacherPushId } from './interfaces/teacher.dto';
import { Teacher } from 'src/entities/teachers.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LevelsService } from 'src/levels/levels.service';
import { SubjectsService } from 'src/subjects/subjects.service';
import { SettingsService } from 'src/settings/setting.service';
import { SRequest } from 'src/entities/requests.entity';

@Controller('api/teachers')
export class TeacherController {
    constructor(
        private readonly teacherService: TeacherService,
        private readonly levelService: LevelsService,
        private readonly subjectService: SubjectsService,
        private readonly settingService: SettingsService
        ) {}
    @Get()
    findAllTeachers() : Promise<Teacher[]>{
      return this.teacherService.findAllTeachers();
    }

    @Get(':id')
    async findOneTeacher(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const teacher =  await this.teacherService.findOneTeacher(id);
            return res.status(HttpStatus.OK).json(teacher);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'personalcard', maxCount: 1 },
        { name: 'certificate', maxCount: 1 },
        { name: 'image', maxCount: 1 },
      ] , {
        storage: diskStorage({
             destination: './images/teachers', 
            filename: (req, file, cb) => {
             const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
             return cb(null, `${randomName}${extname(file.originalname)}`)
            }
        })
    }))
    async createTeacher(@UploadedFiles() files ,@Body() teacherDto : CreateTeacherDto , @Res() res: Response): Promise<Response> {
      try {
        const teacher = await this.teacherService.findOneTeacherByPhone(teacherDto.mobile);
        if(teacher){
          throw new HttpException('this phone number is already registered' ,400);
        }else{
          const formData = Object.assign(new Teacher() , {
            ...teacherDto,
            personalcard:files["personalcard"][0].filename , 
            certificate:files["certificate"][0].filename ,
            image:files["image"][0].filename,
          })

          let other_subjects = []

          if(formData.other_subjects){
              other_subjects = await this.subjectService.findByIds(formData.other_subjects)
          }

          const levels = await this.levelService.findByIds(formData.levels)
          const subjects = await this.subjectService.findByIds(formData.subjects)
          formData.levels = levels
          formData.subjects = subjects
          formData.other_subjects = other_subjects
          await this.teacherService.registerTeacher(formData);
          return res.status(200).json({message: 'Teacher Created'});
        }
      } catch (error) {
          console.log(error)
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              detail: error.detail,
              error: error.message,
          }, 400);
      }
    }

    @Put('update/push/:id')
    async updateTeacherPushId(@Param('id') id: number , @Body() body: UpdateTeacherPushId , @Res() res: Response): Promise<Response> {
        try {
            const teacher = await this.teacherService.findOneTeacher(id)
            if(teacher){
                const data = Object.assign(teacher , { ...body })
                await this.teacherService.updateTeacher(data);
                return res.status(200).json({message: 'Teacher Updated'});
            }
            throw new HttpException('Teacher not found' , HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Delete('delete')
    async deleteTeacher(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.teacherService.deleteTeacher(ids);
          return res.status(200).json({message: 'Teachers Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Get(':id/earnings')
    async getearnings(@Param('id') id :number, @Res() res: Response): Promise<Response> {
        try {
          const requests = await this.teacherService.findOneTeacherRequests(id)
          return res.status(200).json({requests});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Get(':id/total')
    async getGrandTotal(@Param('id') id :number, @Res() res: Response): Promise<Response> {
        try {
          const requests = await this.teacherService.findOneTeacherRequests(id)
          const appComm = await this.settingService.findOneSetting('app-comission')
          
          const total = requests.reduce((accumulator : number, currentValue : SRequest) =>  {
              let grandTotal = currentValue.total - (currentValue.total * currentValue.tax * 0.01) - (currentValue.total * appComm.numberValue * 0.01)
              return  accumulator + grandTotal
          },0)
          
          return res.status(200).json({total});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Delete('soft_delete')
    async softDeleteTeacher(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.teacherService.softDeleteTeacher(ids);
          return res.status(200).json({message: 'Teachers Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Put('status/:id')
    async updateStatus(@Param('id') id: number , @Body('status') status: string , @Res() res: Response): Promise<Response> {
        try {
          const teacher = await this.teacherService.findOneTeacher(id)
          const formData = Object.assign(teacher , { status })
          await this.teacherService.updateTeacher(formData);
          return res.status(200).json({message: 'Teacher Status Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
    
    @Put('update/:id')
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'personalcard', maxCount: 1 },
        { name: 'certificate', maxCount: 1 },
        { name: 'image', maxCount: 1 },
      ] , {
        storage: diskStorage({
             destination: './images/teachers', 
            filename: (req, file, cb) => {
             const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
             return cb(null, `${randomName}${extname(file.originalname)}`)
            }
        }),
        fileFilter:(req, file, callback) => {
            const ext = extname(file.originalname);
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf') {
                return callback(new Error('Only images are allowed'),false)
            }
            callback(null, true)
          }
    }))
    async updateTeacher(@UploadedFiles() files , @Body() data: UpdateTeacherDto, @Res() res: Response): Promise<Response> {
        try {
            console.log(files["image"][0])
            if(data.password === ''){
                delete data.password
            }
            const teacher = await this.teacherService.findOneTeacher(data.id)
            let formData = null
            try {
                formData = Object.assign(teacher , {
                    ...data,
                    personalcard:files["personalcard"][0].filename || teacher.personalcard  , 
                    certificate:files["certificate"][0].filename || teacher.certificate ,
                    image:files["image"][0].filename || teacher.image ,
                }) 
            } catch (err){
                console.log(err)
            } finally {
                formData = Object.assign(teacher , { 
                ...data , id:Number(data.id) , 
                certificate:teacher.certificate , 
                personalcard:teacher.personalcard , 
                image:teacher.image })
            }
            let levels = []
            let subjects = []
            let other_subjects = []
            if(data?.levels){
                levels = await this.levelService.findByIds(formData.levels)
            }
            
            if(data?.subjects){
                subjects = await this.subjectService.findByIds(formData.subjects)
            }

            if(data?.other_subjects){
                other_subjects = await this.subjectService.findByIds(formData.other_subjects)
            }
            formData.levels = levels
            formData.subjects = subjects
            formData.other_subjects = other_subjects
            await this.teacherService.updateTeacher(formData);
            return res.status(200).json({message: 'Teacher Updated'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
