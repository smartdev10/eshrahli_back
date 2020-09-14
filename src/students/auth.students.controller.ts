import { Controller , Post , Body , Res , HttpStatus, HttpException , UnauthorizedException, Param } from '@nestjs/common';
import { StudentService } from './students.service';
import { Response } from 'express';
import { LoginStudentDto ,StudentDto, CreatePaswordStudentDto , ForgotPaswordStudentDto } from './interfaces/student.dto';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { TwilioService } from 'src/twilio/twilio.service';

@Controller('/auth/students')
export class AuthStudentController {

    constructor(private readonly studentService: StudentService,private readonly twilioService: TwilioService) {}
   
    @Post('login')
    async login(@Body() data : LoginStudentDto , @Res() res: Response): Promise<Response> {
      try {
         const student =  await this.studentService.findOneStudentByPhone(data.mobile);
         if (!student) {
            throw new UnauthorizedException('phone number not found');
          }else{
            const valid = await compare(data.password,student.password)
            if(!valid){
               throw new UnauthorizedException('password is not correct');
            }
            const token  = sign({student} , process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({message: 'you are logged in' , token});
          }
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('forgot-password')
    async forgotPassword(@Body() data : ForgotPaswordStudentDto , @Res() res: Response): Promise<Response> {
      try {
          const student = await this.studentService.findOneStudentByPhone(data.mobile)
          if(student){
            await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_ID).verifications.create({to:student.mobile,channel:'sms'})
            return res.status(200).json({message: 'Verification Code Sent'});
          }
          return res.status(HttpStatus.BAD_REQUEST).json({message: 'Student Not Found'});
      } catch (error) {
        console.log(error)
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('create-password')
    async createPassword(@Body() data : CreatePaswordStudentDto , @Res() res: Response): Promise<Response> {
      try {
          const student = await this.studentService.findOneStudentByPhone(data.mobile)
          if(student){
            const formData = Object.assign(student , { ...data })
            await this.studentService.updateStudent(formData);
            return res.status(200).json({message: 'Password Created'});
          }
          return res.status(HttpStatus.BAD_REQUEST).json({message: 'Student Not Found'});
      } catch (error) {
        console.log(error)
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('register')
    async register(@Body() data : StudentDto , @Res() res: Response): Promise<Response> {
      try {
          await this.studentService.saveStudent(data);
          await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_ID).verifications.create({to:data.mobile,channel:'sms'})
          return res.status(200).json({message: 'Student Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('verify')
    async verify(@Body('mobile') mobile : string ,@Body('code') code : string , @Res() res: Response): Promise<Response> {
      try {
          const student = await this.studentService.findOneStudentByPhone(mobile);
          if(student){
            const verificationCheck = await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_ID).verificationChecks.create({to:student.mobile , code})
            if(verificationCheck.valid){
              return res.status(HttpStatus.OK).json({message: 'Code is Valid'});
            }
            return res.status(HttpStatus.BAD_REQUEST).json({message: 'Code is Not Valid'});
          }else{
            return res.status(HttpStatus.BAD_REQUEST).json({message: 'Student Not Found'});
          }
      } catch (error) {
        console.log(error)
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
}
