import { Controller , Post , Body , Res , HttpStatus, HttpException , UnauthorizedException, Param } from '@nestjs/common';
import { StudentService } from './students.service';
import { Response } from 'express';
import { LoginStudentDto ,StudentDto, CreatePaswordStudentDto } from './interfaces/student.dto';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

@Controller('/auth/students')
export class StudentController {

    constructor(private readonly studentService: StudentService) {}
   
    @Post('login')
    async login(@Body() data : LoginStudentDto , @Res() res: Response): Promise<Response> {
      try {
         const student =  await this.studentService.findOneStudentByPhone(data.mobile);
         if (!student) {
            throw new UnauthorizedException('could not find student with this phone number');
          }else{
            const valid = await compare(data.password,student.password)
            const token  = sign({student} , process.env.ACCESS_TOKEN_SECRET);
            if(!valid){
               throw new UnauthorizedException('password is not correct');
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

    @Post('create-password/:id')
    async createPassword(@Param('id') id: number , @Body() data : CreatePaswordStudentDto , @Res() res: Response): Promise<Response> {
      try {
          const teacher = await this.studentService.findOneStudent(id)
          const formData = Object.assign(teacher , { ...data })
          await this.studentService.updateStudent(formData);
          return res.status(200).json({message: 'Password Created'});
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
          await this.studentService.insertStudent(data);
          return res.status(200).json({message: 'Student Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }

    @Post('verify')
    async verify(@Body('mobile') mobile : string , @Res() res: Response): Promise<Response> {
      try {
          const student = await this.studentService.findOneStudentByPhone(mobile);
          return res.status(200).json({message: 'Verification Code Sent'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
}
