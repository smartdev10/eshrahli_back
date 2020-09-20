import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { TeacherService } from './teachers.service';
import { Response } from 'express';
import { UpdateTeacherDto , CreateTeacherDto } from './interfaces/teacher.dto';
import { Teacher } from 'src/entities/teachers.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LevelsService } from 'src/levels/levels.service';
import { SubjectsService } from 'src/subjects/subjects.service';

@Controller('api/teachers')
export class TeacherController {
    constructor(
        private readonly teacherService: TeacherService,
        private readonly levelService: LevelsService,
        private readonly subjectService: SubjectsService
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
          const formData = Object.assign(new Teacher() , {
            ...teacherDto,
            personalcard:files["personalcard"][0].filename , 
            certificate:files["certificate"][0].filename ,
            image:files["image"][0].filename,
          })
          const levels = await this.levelService.findByIds(formData.levels)
          const subjects = await this.subjectService.findByIds(formData.subjects)
          formData.levels = levels
          formData.subjects = subjects
          await this.teacherService.insertTeacher(formData);
          return res.status(200).json({message: 'Teacher Created'});
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
          return res.status(200).json({message: 'Teacher Deleted'});
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
        })
    }))
    async updateTeacher(@UploadedFiles() files , @Body() data: UpdateTeacherDto, @Res() res: Response): Promise<Response> {
        try {
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
                    image:files["image"][0].filename || teacher.certificate ,
                }) 
            } catch {

            } finally {
                formData = Object.assign(teacher , { 
                ...data , id:Number(data.id) , 
                certificate:teacher.certificate , 
                personalcard:teacher.personalcard , 
                image:teacher.image })
            }
            const levels = await this.levelService.findByIds(formData.levels)
            const subjects = await this.subjectService.findByIds(formData.subjects)
            formData.levels = levels
            formData.subjects = subjects
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
