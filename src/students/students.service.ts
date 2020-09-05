import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { StudentDto } from './interfaces/student.dto';
import { Student } from 'src/entities/students.entity';


@Injectable()
export class StudentService {
    
    constructor(
        @InjectRepository(Student)
        private teacherRepository: Repository<Student>,
    ) {}

    async findOneStudent(id: number) {
        return await this.teacherRepository.findOneOrFail(id)
    }

    async findOneStudentByPhone(mobile: string) {
        return await this.teacherRepository.findOneOrFail({
            where:{
                mobile
            }
        })
    }

    async insertStudent(data : StudentDto ) {
        const entity = Object.assign(new Student(), data);
        return await this.teacherRepository.save(entity);
    }

    async findAllStudents() {
       return await this.teacherRepository.find({});
    }

    async deleteStudent(ids: number[]) {
        return await  this.teacherRepository.delete(ids);
    }

    async updateStudent(data: StudentDto) {
        return await this.teacherRepository.save(data);
    }
      
}
