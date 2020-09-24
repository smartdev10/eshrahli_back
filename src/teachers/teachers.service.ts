import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Teacher } from 'src/entities/teachers.entity';
import { TeacherDto, UpdateTeacherDto , searchTeacher } from './interfaces/teacher.dto';


@Injectable()
export class TeacherService {
    
    constructor(
        @InjectRepository(Teacher)
        private teacherRepository: Repository<Teacher>,
    ) {}

    async findOneTeacher(id: number) {
        return await this.teacherRepository.findOne(id ,{relations:['requests' , 'levels' , 'subjects' , 'city' , 'nationality']})
    }

    async findOne(id: Teacher) {
        return await this.teacherRepository.findOne(id)
    }

    async findOneTeacherByPhone(mobile: string) {
        return await this.teacherRepository.findOne({
            where :{
                mobile
            }
        })
    }

    async insertTeacher(teacherDto : TeacherDto ) {
        const entity = Object.assign(new Teacher(), teacherDto);
        return await this.teacherRepository.save(entity);
    }

    async registerTeacher(teacherDto : TeacherDto ) {
        return await this.teacherRepository.save(teacherDto);
    }

    async startTeacher(teacherDto : TeacherDto ) {
        return await this.teacherRepository.save(teacherDto);
    }

    async searchTeachers(searchData : searchTeacher) { 
        return await this.teacherRepository
                .createQueryBuilder('teacher')
                .where('gender = :gender', { gender: searchData.gender })
                .innerJoinAndSelect('teacher.subjects', 'subject' , 'subject.id = :subject' , { subject: searchData.subjects })
                .innerJoinAndSelect('teacher.levels', 'level' , 'level.id = :level', { level: searchData.levels })
                .innerJoinAndSelect('teacher.city','city')
                .where('city.id = :city' , { city: searchData.city.id })
                .getManyAndCount();
     }

    async findAllTeachers() {
       return await this.teacherRepository.find({
           relations:['subjects' , 'levels' , 'city' , 'nationality'],
           order :{
            createdAt:"DESC"
           }
       });
    }

    async deleteTeacher(ids: number[]) {
        return await  this.teacherRepository.delete(ids);
    }

    async updateTeacher(data: UpdateTeacherDto) {
        return await this.teacherRepository.save(data);
    }
      
}
