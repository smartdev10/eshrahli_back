import { Brackets, Repository } from 'typeorm';
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

    async retrySearchTeachers(searchData : searchTeacher) { 
        return  await this.teacherRepository
                .createQueryBuilder('teacher')
                .innerJoinAndSelect('teacher.city','city')
                .leftJoinAndSelect('teacher.levels', 'level')
                .leftJoinAndSelect('teacher.other_subjects', 'other')
                .leftJoinAndSelect('teacher.subjects', 'subject')
                .where('gender = :gender', { gender: searchData.gender })
                .andWhere('city.id = :city' , { city: searchData.city.id })
                .andWhere('level.id = :level', { level: searchData.levels.id })
                .andWhere(new Brackets(qb => {
                   qb.andWhere('other.id = :other' , { other: searchData.subjects.id })
                   .orWhere('subject.id = :subject' , { subject: searchData.subjects.id })
                }))
                .getMany();

     }

    async searchTeachers(searchData : searchTeacher) { 
        return  await this.teacherRepository
                .createQueryBuilder('teacher')
                .innerJoinAndSelect('teacher.city','city')
                .leftJoinAndSelect('teacher.levels', 'level')
                .leftJoinAndSelect('teacher.other_subjects', 'other')
                .leftJoinAndSelect('teacher.subjects', 'subject')
                .where('gender = :gender', { gender: searchData.gender })
                .andWhere('city.id = :city' , { city: searchData.city.id })
                .andWhere('level.id = :level', { level: searchData.levels })
                .andWhere(new Brackets(qb => {
                   qb.andWhere('other.id = :other' , { other: searchData.subjects })
                   .orWhere('subject.id = :subject' , { subject: searchData.subjects })
                }))
                .getMany();

     }

    async findAllTeachers() {
       return await this.teacherRepository.find({
           relations:['subjects' , 'other_subjects' , 'levels' , 'city' , 'nationality'],
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
