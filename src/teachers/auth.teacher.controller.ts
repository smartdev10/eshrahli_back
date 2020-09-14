import { Controller , Post , Body , Res , HttpStatus, HttpException, UnauthorizedException, UseInterceptors, UploadedFiles , Put, Param, Inject } from '@nestjs/common';
import { TeacherService } from './teachers.service';
import { Response } from 'express';
import { LoginTeacherDto , UpdateTeacherDto, TeacherDto, CreatePassTeacherDto , ForgotPassTeacherDto } from './interfaces/teacher.dto';
import { compare } from 'bcryptjs';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { sign } from 'jsonwebtoken';
import { extname } from 'path';
import { diskStorage } from  'multer';
import { LevelsService } from 'src/levels/levels.service';
import { SubjectsService } from 'src/subjects/subjects.service';
import { TwilioService } from 'src/twilio/twilio.service';

@Controller('/auth/teachers')
export class AuthTeacherController {
    constructor(
      private readonly teacherService: TeacherService, 
      private readonly levelService: LevelsService, 
      private readonly subjectService: SubjectsService,
      private readonly twilioService: TwilioService
      ) {}
   
    @Post('login')
    async login(@Body() data : LoginTeacherDto , @Res() res: Response): Promise<Response> {
      try {
          const teacher =  await this.teacherService.findOneTeacherByPhone(data.mobile);
          if (!teacher) {
            throw new UnauthorizedException('phone number not found');
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

    @Post('register')
    async start(@Body() data : TeacherDto , @Res() res: Response): Promise<Response> {
      try {
          const teacher = await this.teacherService.registerTeacher(data);
          return res.status(200).json({message: 'Teacher Created' , teacher});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('forgot-password')
    async forgotPassword(@Body() data : ForgotPassTeacherDto , @Res() res: Response): Promise<Response> {
      try {
          const teacher = await this.teacherService.findOneTeacherByPhone(data.mobile)
          await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_ID).verifications.create({to:teacher.mobile,channel:'sms'})
          return res.status(200).json({message: 'Verification Code Sent'});
      } catch (error) {
        console.log(error)
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('create-password')
    async createPassword(@Body() data : CreatePassTeacherDto , @Res() res: Response): Promise<Response> {
      try {
          const teacher = await this.teacherService.findOneTeacher(data.id)
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
          return res.status(HttpStatus.OK).json({message: 'Teacher Updated'});
      } catch (error) {
        console.log(error)
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('verify')
    async verify(@Body('mobile') mobile : string ,@Body('code') code : string , @Res() res: Response): Promise<Response> {
      try {
          const teacher = await this.teacherService.findOneTeacherByPhone(mobile);
          const verificationCheck = await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_ID)
          .verificationChecks
          .create({to:teacher.mobile , code})
          if(verificationCheck.valid){
            return res.status(200).json({message: 'Code is Valid'});
          }
          return res.status(HttpStatus.BAD_REQUEST).json({message: 'Code is Not Valid'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
}