import { Controller , Post , Body , Res , HttpStatus, HttpException , UnauthorizedException, Query } from '@nestjs/common';
import { StudentService } from './students.service';
import { Response } from 'express';
import { LoginStudentDto , StudentDto , CreatePaswordStudentDto , ForgotPaswordStudentDto , CheckStudentDto, ChangePaswordStudentDto } from './interfaces/student.dto';
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
         if (student) {
            const valid = await compare(data.password,student.password)
            if(!valid){
               throw new UnauthorizedException('كلمة المرور غير صحيحة');
            }
            const fstudent =  await this.studentService.findOneById(student.id);
            const token  = sign({student} , process.env.ACCESS_TOKEN_SECRET);
            return res.status(200).json({message: 'you are logged in' , token , student:fstudent});
          }else{
            throw new UnauthorizedException('رقم الهاتف الذي أدخلته لا يطابق أي حساب');
          }
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('register')
    async register(@Body() data : StudentDto , @Res() res: Response): Promise<Response> {
      try {
          const student = await this.studentService.findOneStudentByPhone(data.mobile);
          if(student){
            throw new HttpException('this phone number is already registered' ,400);
          }else{
            const student = await this.studentService.insertStudent(data);
            const foundStudent = await this.studentService.findOneById(student.id);
            return res.status(200).json({ message: 'Student Created' , student:foundStudent });
          }
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.detail,
          },  HttpStatus.BAD_REQUEST);
      }
    }

    @Post('check_number')
    async check(@Body() data : CheckStudentDto , @Res() res: Response): Promise<Response> {
      try {
          const student = await this.studentService.findOneStudentByPhone(data.mobile);
          if(student){
            throw new HttpException('Phone Number Already Taken', HttpStatus.BAD_REQUEST);
          }else{
            await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_ID).verifications.create({to:data.mobile,channel:'sms'})
            return res.status(200).json({ message: 'SMS Created' });
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
          throw new HttpException('Student Not Found' ,400);
      } catch (error) {
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
            await this.studentService.updateStudentPassword(formData);
            return res.status(200).json({message: 'Password Created'});
          }
          throw new HttpException('Student Not Found' ,400);
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('change-password')
    async changePassword(@Body() data : ChangePaswordStudentDto , @Res() res: Response): Promise<Response> {
      try {
          const student = await this.studentService.findOneStudentByPhone(data.mobile)
          if(student){
            const valid = await compare(data.currentPassword,student.password)
            if(!valid){
              throw new HttpException('Current Password Not Correct' ,400);
            }
            const { password } = data
            const formData = Object.assign(student , { password })
            await this.studentService.updateStudentPassword(formData);
            return res.status(HttpStatus.OK).json({message: 'Password Changed'});
          }
          throw new HttpException('Student Not Found' ,400);
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('verify')
    async verify(@Body('mobile') mobile : string , @Body('type') type : string , @Body('code') code : string , @Res() res: Response): Promise<Response> {
      try {
          if(type && type === 'new'){
            const student = await this.studentService.findOneStudentByPhone(mobile);
            if(student){
               throw new HttpException('this phone number is already registered' ,400);
            }else{
              const verificationCheck = await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_ID).verificationChecks.create({to:mobile , code})
              if(verificationCheck.valid){
                return res.status(HttpStatus.OK).json({message: 'Code is Valid'});
              }
              throw new HttpException('Code is Not Valid' ,400);
            }
          }else{
            const student = await this.studentService.findOneStudentByPhone(mobile);
            if(student){
              const verificationCheck = await this.twilioService.client.verify.services(process.env.TWILIO_SERVICE_ID).verificationChecks.create({to:student.mobile , code})
              if(verificationCheck.valid){
                return res.status(HttpStatus.OK).json({message: 'Code is Valid'});
              }
              throw new HttpException('Code is Not Valid' ,400);
            }else{
              throw new HttpException('Student Not Found' ,400);
            }
          }
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
}
