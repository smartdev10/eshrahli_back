import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { StudentDto } from './interfaces/student.dto';
import { Student } from 'src/entities/students.entity';
import { CreatePassTeacherDto } from 'src/teachers/interfaces/teacher.dto';


@Injectable()
export class StudentService {
    
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) {}

    async findOneStudent(id: number) {
        return await this.studentRepository.findOneOrFail(id)
    }

    async findOneStudentByPhone(mobile: string) {
        return await this.studentRepository.findOne({
            select:['id','password' ,'name','mobile','gender' ,'push_id','status'],
            where:{
                mobile
            }
        })
    }

    async insertStudent(data : StudentDto ) {
        const entity = Object.assign(new Student(), data);
        return await this.studentRepository.save(entity);
    }


    async saveStudent(data : StudentDto ) {
        return await this.studentRepository.save(data);
    }

    async findAllStudents() {
       return await this.studentRepository.find();
    }

    async deleteStudent(ids: number[]) {
        return await  this.studentRepository.delete(ids);
    }

    async updateStudent(data: StudentDto) {
        return await this.studentRepository.save(data);
    }

    async updateStudentPassword(data: CreatePassTeacherDto) {
        return await this.studentRepository.save(data);
    }
      
}
