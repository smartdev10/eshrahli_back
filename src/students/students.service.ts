import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreatePaswordStudentDto, StudentDto } from './interfaces/student.dto';
import { Student } from 'src/entities/students.entity';


@Injectable()
export class StudentService {
    
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
    ) {}

    async findOneStudent(id: number) {
        return await this.studentRepository.findOne(id , {
            relations:[
            'requests' , 
            'requests.city' , 
            'requests.subject' , 
            'requests.level' , 
            'requests.teacher' , 
            'requests.teacher.city' , 
            'requests.teacher.nationality',
            'requests.teacher.levels' , 
            'requests.teacher.subjects'
           ],
           order:{
               createdAt:"DESC"
           }
        })
    }

    async findOne(student: Student) {
        return await this.studentRepository.findOne(student , {relations:['city']})
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

    async findAllStudents() {
       return await this.studentRepository.find({
           relations:['favorites' , 'requests'],
           order :{
             createdAt:"DESC"
           }
       });
    }

    async deleteStudent(ids: number[]) {
        return await  this.studentRepository.delete(ids);
    }

    async updateStudent(data: StudentDto) {
        return await this.studentRepository.save(data);
    }

    async updateStudentPassword(data: CreatePaswordStudentDto) {
        return await this.studentRepository.save(data);
    }
      
}
