import { Controller , Post , Body , Res , HttpStatus, HttpException, UnauthorizedException, UseInterceptors, UploadedFiles , Put, Param } from '@nestjs/common';
import { TeacherService } from './teachers.service';
import { Response } from 'express';
import { LoginTeacherDto , UpdateTeacherDto, TeacherDto, CreatePassTeacherDto } from './interfaces/teacher.dto';
import { compare } from 'bcryptjs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { sign } from 'jsonwebtoken';
import { extname } from 'path';
import { diskStorage } from  'multer';
import { LevelsService } from 'src/levels/levels.service';
import { SubjectsService } from 'src/subjects/subjects.service';

@Controller('/auth/teachers')
export class AuthTeacherController {
    constructor(private readonly teacherService: TeacherService, private readonly levelService: LevelsService, private readonly subjectService: SubjectsService) {}
   
    @Post('login')
    async login(@Body() data : LoginTeacherDto , @Res() res: Response): Promise<Response> {
      try {
          const teacher =  await this.teacherService.findOneTeacherByPhone(data.mobile);
          if (!teacher) {
            throw new UnauthorizedException('could not find teacher with this phone number');
          }else{
            const valid = await compare(data.password,teacher.password)
            const token  = sign({teacher} , process.env.ACCESS_TOKEN_SECRET);
            if(!valid){
               throw new UnauthorizedException('password ins not valid');
            }
            return res.status(200).json({message: 'you are logged in' , token});
          }
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('create')
    async start(@Body() data : TeacherDto , @Res() res: Response): Promise<Response> {
      try {
          const teacher = await this.teacherService.registerTeacher(data);
          return res.status(200).json({message: 'Teacher Created' , teacher});
      } catch (error) {
        console.log(error)
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('create-password/:id')
    async createPassword(@Param('id') id: number , @Body() data : CreatePassTeacherDto , @Res() res: Response): Promise<Response> {
      try {
          const teacher = await this.teacherService.findOneTeacher(id)
          const formData = Object.assign(teacher , { ...data })
          await this.teacherService.updateTeacher(formData);
          return res.status(200).json({message: 'Password Created'});
      } catch (error) {
        console.log(error)
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Put('register/:id')
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
    async register(@UploadedFiles() files ,@Param('id') id: number , @Body() data : UpdateTeacherDto , @Res() res: Response): Promise<Response> {
      try {
          const teacher = await this.teacherService.findOneTeacher(id)

          const formData = Object.assign(teacher , {
            ...data,
            personalcard:files["personalcard"][0].filename , 
            certificate:files["certificate"][0].filename ,
            image:files["image"][0].filename,
          })
          console.log(formData)
          const levels = await this.levelService.findByIds(formData.levels)
          const materials = await this.subjectService.findByIds(formData.materials)
          formData.levels = levels
          formData.materials = materials
          await this.teacherService.updateTeacher(formData);
          return res.status(200).json({message: 'Teacher Updated'});
      } catch (error) {
        console.log(error)
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('verify')
    async verify(@Body('mobile') mobile : string , @Res() res: Response): Promise<Response> {
      try {
          const teacher = await this.teacherService.findOneTeacherByPhone(mobile);
          return res.status(200).json({message: 'Verification Code Sent'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
}