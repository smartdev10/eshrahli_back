import { Controller, Get, Post, Body, Res, Delete, Put , Param, Query, HttpStatus, HttpException } from '@nestjs/common';
import { StudentService } from './students.service';
import { Response } from 'express';
import { StudentDto , UpdateStudentPushId , UpdateBankInfoStudentDto } from './interfaces/student.dto';
import { Student } from 'src/entities/students.entity';

@Controller('api/students')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}
    @Get()
    findAllStudents() : Promise<Student[]>{
      return this.studentService.findAllStudents();
    }

    @Get(':id')
    async findOneStudent(@Param('id') id: number  ,  @Res() res: Response) : Promise<Response>  {
      try {
            const student =  await this.studentService.findOneStudent(id);
            return res.status(HttpStatus.OK).json(student);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Post('create')
    async createStudent(@Body() body : StudentDto , @Res() res: Response): Promise<Response> {
      try {
          await this.studentService.insertStudent(body);
          return res.status(200).json({message: 'Student Created'});
      } catch (error) {
          throw new HttpException({
              status: HttpStatus.BAD_REQUEST,
              error: error.message,
          }, 400);
      }
    }
    @Delete('delete')
    async deleteStudent(@Query('filter') filter, @Res() res: Response): Promise<Response> {
        try {
          const { ids } = JSON.parse(filter)
          await this.studentService.deleteStudent(ids);
          return res.status(200).json({message: 'Student Deleted'});
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Put('update/bankinfo/:id')
    async updateStudentBankInfo(@Param('id') id: number , @Body() body: UpdateBankInfoStudentDto , @Res() res: Response): Promise<Response> {
        try {
            const student = await this.studentService.findOneStudent(id)
            if(student){
                const formData = Object.assign(student , { ...body })
                await this.studentService.updateStudent(formData);
                return res.status(200).json({message: 'Student Updated'});
            }
            throw new HttpException('Student not found' , HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Put('update/push/:id')
    async updateStudentPushId(@Param('id') id: number , @Body() body: UpdateStudentPushId , @Res() res: Response): Promise<Response> {
        try {
            const student = await this.studentService.findOneStudent(id)
            if(student){
                const formData = Object.assign(student , { ...body })
                await this.studentService.updateStudent(formData);
                return res.status(200).json({message: 'Student Updated'});
            }
            throw new HttpException('Student not found' , HttpStatus.BAD_REQUEST)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }

    @Put('update/:id')
    async updateStudent(@Param('id') id: number , @Body() body: StudentDto, @Res() res: Response): Promise<Response> {
        try {
            const student = await this.studentService.findOneStudent(id)
            if(student){
                const formData = Object.assign(student , { ...body })
                await this.studentService.updateStudent(formData);
                return res.status(200).json({message: 'Student Updated'});
            }
            throw new HttpException('Student not found' , HttpStatus.BAD_REQUEST)
        } catch (error) {
            console.log(error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, 400);
        }
    }
}
