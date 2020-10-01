import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { CreatePaswordStudentDto, StudentDto } from './interfaces/student.dto';
import { Student } from 'src/entities/students.entity';
import { SRequest } from 'src/entities/requests.entity';


@Injectable()
export class StudentService {
    
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>,
        @InjectRepository(SRequest)
        private requestsRepository: Repository<SRequest>,
    ) {}

    async findStudentRequests(id: number) {
        return await this.requestsRepository.findOne(id , {
            relations:[
            'city' , 
            'subject' , 
            'level' , 
            'coupon' , 
            'teacher' , 
            'teacher.city' , 
            'teacher.nationality',
            'teacher.levels' , 
            'teacher.subjects'
           ],
           order :{
               createdAt:"DESC"
           }
        })
    }

    async findOne(student: Student) {
        return await this.studentRepository.findOne(student , {relations:['city']})
    }

    async findOneById(id: number) {
        return await this.studentRepository.findOne(id , {relations:['city']})
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
